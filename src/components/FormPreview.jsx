import React from 'react';
import FormHeader from './FormHeader';
import SortableFieldList from './SortableFieldList';
import { Field, ErrorMessage } from 'formik';
import { useParams } from "react-router-dom";
  
const FormPreview = ({ 
  formTitle, 
  formDescription, 
  formPages, 
  currentPage, 
  onDrop, 
  setFieldsForPage, 
  onDelete,
  formikValues,
  formikErrors,
  formikTouched
}) => {
  const { id } = useParams();

  const handleSaveForm = async () => {
    try {
      const fields = formPages[currentPage] || [];
      console.log(fields);

      const questionsData = fields.map((field) => ({
        label: field.label,
        dataType: field.type,
        required: field.required,
        formId: id,
        options: field.options || [],
      }));
      console.log(questionsData);

      const response = await fetch(
        "http://localhost:8084/api/questions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionsData),
        }
      );

      if (response.ok) {
        alert("Form saved successfully!");
      } else {
        alert("Error saving form.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div
      className="flex-1 border rounded-lg relative p-6"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        try {
          const field = JSON.parse(e.dataTransfer.getData("field"));
          onDrop(field);
        } catch (error) {
          console.error("Error parsing dragged field:", error);
        }
      }}
    >
      <div className="p-6 bg-purple-200 rounded-t-lg flex justify-between items-center">
        <FormHeader />
        <div className="text-red-500 font-bold">incedo</div>
      </div>
      <div className="absolute top-1 right-2 bg-white/30 backdrop-blur-lg text-black text-sm px-4 py-2 rounded-full shadow-lg border border-white/40">
        Page {currentPage + 1} of {formPages.length}
      </div>

      <div className="p-6">
        <form>
          <SortableFieldList
            fields={formPages[currentPage] || []}
            setFields={setFieldsForPage}
            onDelete={onDelete}
          />
        </form>

       
        <button
          type="button"
          className="bg-purple-400 text-black px-6 py-2 rounded mt-4 w-full"
          onClick={handleSaveForm} 
        >
          Save Form
        </button>
      </div>
    </div>
  );
};

export default FormPreview;
