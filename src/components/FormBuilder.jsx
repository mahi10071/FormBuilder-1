
  
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import Header from './Header';
import Sidebar from './Sidebar';
import FormPreview from './FormPreview';
import SortableFieldList from './SortableFieldList';
import { initialFields, dataFields, customFields } from '../data/fielddata';
import { validationSchema , initialValues } from '../validations/formvalidation'; 
import * as Yup from 'yup';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("Demo Form");
  const [formDescription, setFormDescription] = useState("This is form description");
  const [formFields, setFormFields] = useState([
    { id: 'name', type: 'text', label: 'Name' },
    { id: 'email', type: 'email', label: 'Email' },
    { id: 'gender', type: 'radio', label: 'Gender', options: ['Male', 'Female'] }
  ]);
  const [formPages, setFormPages] = useState([
    [{ id: 'name', type: 'text', label: 'Name' },
    { id: 'email', type: 'email', label: 'Email' }],
  ]);
  const [companyLogo, setCompanyLogo] = useState(null);
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
    const allFieldIds = new Set();
    
    formPages.forEach(page => {
      page.forEach(field => {
        allFieldIds.add(field.id);
      });
    });
    const formValues = { ...initialValues };
    
    allFieldIds.forEach(fieldId => {
      if (!(fieldId in formValues)) {
        const fieldType = getFieldType(fieldId);
        
        if (fieldType === 'checkbox') {
          formValues[fieldId] = false;
        } else if (fieldType === 'file') {
          formValues[fieldId] = null;
        } else {
          formValues[fieldId] = '';
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
    return 'text'; 
  };
  
  return (
    <Formik
    initialValues={getFormValues()}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    enableReinitialize={true} 
  >

      {({ isSubmitting, errors, touched, values }) => (
        <Form className="flex flex-col min-h-screen bg-white">
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
                
                formPages={formPages}
                currentPage={currentPage}
                onDrop={onDrop}
                setFieldsForPage={setFieldsForPage}
                onDelete = {handleDeleteField}
                formikValues={values} 
                formikErrors={errors} 
                formikTouched={touched}
                
              />

              <div className="flex justify-between mt-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="px-2 py-1 border-2 border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition"
                >
                  Previous
                </button>

                <div className="flex items-center gap-4">
                  <button
                    onClick={addPage}
                    className="px-2 py-1 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                  >
                    Add Page
                  </button>

                  <button
                    onClick={removePage}
                    disabled={formPages.length === 1}
                    className="px-2 py-1 border-2 border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                  >
                    Remove Page
                  </button>
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage >= formPages.length - 1}
                  className="px-2 py-1 border-2 border-gray-500 text-gray-500 rounded hover:bg-gray-500 hover:text-white transition"
                >
                  Next
                </button>
              </div>

               {/* <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit Form
              </button> */}

               {/* <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-bold">Form State (Debug):</h3>
                <div>
                  <pre className="text-xs mt-2">{JSON.stringify({values, errors, touched}, null, 2)}</pre>
                </div>
              </div> */}
              
            </main>
          </div>
        
        </Form>
      )}
    </Formik>
  );
};

export default FormBuilder;
