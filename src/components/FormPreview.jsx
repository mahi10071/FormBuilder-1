import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormHeader from "./FormHeader";
import SortableFieldList from "./SortableFieldList";
import { useParams } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { IconButton, Tooltip } from "@mui/material";
import {
  Delete,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

const deleteButtonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

const FormPreview = ({ onDrop, setFieldsForPage, onDelete }) => {
  
  const { id } = useParams();
  const { formPages, currentPage, nextPage, prevPage, removePage } =
    useFormContext();

  const handleSaveForm = async () => {
    try {
      const fields = formPages[currentPage] || [];
      console.log(fields);

      const questionsData = fields.map((field) => ({
        label: field.label,
        dataType: field.dataType,
        controlType: field.controlType,
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
        toast.success("Form saved successfully!", {
          style: { background: "#d4edda", color: "#155724" },
        });
      } else {
        toast.error("Error saving form.", {
          style: { background: "#f8d7da", color: "#721c24" },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred.", {
        style: { background: "#f8d7da", color: "#721c24" },
      });
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

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="p-6"
        >
          <form>
            <SortableFieldList
              fields={formPages[currentPage] || []}
              setFields={setFieldsForPage}
              onDelete={onDelete}
            />
          </form>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col items-center mt-4 space-y-4">
        <button
          type="button"
          className="bg-gradient-to-r from-purple-300 to-indigo-300 text-black px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          onClick={handleSaveForm}
        >
          Ready with the Form!
        </button>

        <div className="flex justify-between w-full max-w-md items-center">
          {currentPage > 0 && (
            <Tooltip title="Previous Page">
              <IconButton onClick={prevPage} color="default">
                <KeyboardDoubleArrowLeft fontSize="medium" />
              </IconButton>
            </Tooltip>
          )}

          {formPages.length > 1 && (
            <Tooltip title="Delete This Page">
              <motion.div
                variants={deleteButtonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <IconButton onClick={removePage} color="error">
                  <Delete fontSize="medium" />
                </IconButton>
              </motion.div>
            </Tooltip>
          )}

          {currentPage < formPages.length - 1 && (
            <Tooltip title="Next Page">
              <IconButton onClick={nextPage} color="default">
                <KeyboardDoubleArrowRight fontSize="medium" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
