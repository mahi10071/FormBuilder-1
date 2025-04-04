import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FormPreview from "./FormPreview";
import SortableFieldList from "./SortableFieldList";
import {
  initialFields,
  dataFields,
  initialValues,
  customFields,
} from "../data/fielddata";
// import { validationSchema, initialValues } from "../validations/formvalidation";
import * as Yup from "yup";
import { FormContext } from "../context/FormContext";

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("Demo Form");
  const [formDescription, setFormDescription] = useState(
    "This is form description"
  );
  const [formFields, setFormFields] = useState([
    { id: "name", type: "text", label: "Name" },
    { id: "email", type: "email", label: "Email" },
    {
      id: "gender",
      type: "radio",
      label: "Gender",
      options: ["Male", "Female"],
    },
  ]);
  const [formPages, setFormPages] = useState([
    [
      { id: "name", type: "text", label: "Name" },
      { id: "email", type: "email", label: "Email" },
    ],
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pendingPageAdd, setPendingPageAdd] = useState(false);

  useEffect(() => {
    if (pendingPageAdd) {
      setCurrentPage(formPages.length - 1);
      setPendingPageAdd(false);
    }
  }, [formPages, pendingPageAdd]);

  const onDrop = (field) => {
    const newField = { ...field };
    setFormPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage] = [...updatedPages[currentPage], newField];
      return updatedPages;
    });
  };

  const handleDeleteField = (fieldId) => {
    setFormPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage] = updatedPages[currentPage].filter(
        (field) => field.id !== fieldId
      );
      return updatedPages;
    });
  };

  const setFieldsForPage = (updatedFields) => {
    setFormPages((prevPages) => {
      const newPages = [...prevPages];
      newPages[currentPage] = updatedFields;
      return newPages;
    });
  };

  const addPage = () => {
    setFormPages((prevPages) => [...prevPages, []]);
    setPendingPageAdd(true);
  };

  const removePage = () => {
    if (formPages.length > 1) {
      setFormPages((prevPages) => {
        const newPages = prevPages.filter((_, index) => index !== currentPage);
        return newPages;
      });
      setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
    }
  };

  const nextPage = () => {
    if (currentPage < formPages.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form submitted with values:", values);
    setSubmitting(false);
  };

  const getFormValues = () => {
    console.log("called")
    const allFieldIds = new Set();

    formPages.forEach((page) => {
      page.forEach((field) => {
        allFieldIds.add(field.id);
      });
    });
    const formValues = { ...initialValues };

    allFieldIds.forEach((fieldId) => {
      if (!(fieldId in formValues)) {
        const fieldType = getFieldType(fieldId);

        if (fieldType === "checkbox") {
          formValues[fieldId] = false;
        } else if (fieldType === "file") {
          formValues[fieldId] = null;
        } else {
          formValues[fieldId] = "";
        }
      }
    });
    return formValues;
  };

  const getFieldType = (fieldId) => {
    for (const page of formPages) {
      for (const field of page) {
        if (field.id === fieldId) {
          return field.type;
        }
      }
    }
    return "text";
  };

  return (
    <FormContext.Provider
      value={{
        addPage,
        removePage,
        nextPage,
        prevPage,
        currentPage,
        formPages,
      }}
    >
      <Formik
        initialValues={getFormValues()}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({isSubmitting, errors, touched, values }) => (
          <Form initialValues={getFormValues()} className="flex flex-col min-h-screen bg-white">
            <Header formTitle={formTitle} />

            <div className="flex flex-1 p-5">
              <div className="w-1/4 pr-4">
                <Sidebar
                  onDrop={onDrop}
                  dataFields={dataFields}
                  initialFields={initialFields}
                  customFields={customFields}
                />
              </div>
              <main className="w-3/4">
                <FormPreview
                 formTitle={formTitle}
                 formDescription={formDescription}
                 formPages={formPages}
                 currentPage={currentPage}
                 onDrop={onDrop}
                 setFieldsForPage={setFieldsForPage}
                 onDelete={handleDeleteField}
                 formikValues={values}
                 formikErrors={errors}
                 formikTouched={touched}
                 handleFieldsChange={setFieldsForPage}
                >
                  <SortableFieldList
                  fields={formPages[currentPage] || []}
                  onFieldsChange={setFieldsForPage}
                  // onDelete={(id) => setFields(fields.filter(field => field.id !== id))}
                  onDelete={handleDeleteField}

                  // onFieldValueChange={handleFieldValueChange}  // Add this prop
                />
                 </FormPreview>
              </main>
            </div>
          </Form>
        )}
      </Formik>
    </FormContext.Provider>
  );
};

export default FormBuilder;
