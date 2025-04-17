import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormHeader from "./FormHeader";
import SortableFieldList from "./SortableFieldList";
import { useNavigate, useParams } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { IconButton, Tooltip } from "@mui/material";
import {
  Delete,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

  const navigate = useNavigate();
  const handleSubmitForm = async () => {
    try {
      for (const page of formPages) {
        for (const field of page) {
          const questionPayload = {
            controlType: field.controlType,
            label: field.label,
            dataType: field.dataType,
            required: field.required || false,
            formId: id,
          };

          const questionResponse = await axios.post(
            `http://localhost:8081/api/questions/create/${id}`,
            questionPayload
          );

          const savedQuestion = questionResponse.data;

          if (
            ["radiobutton", "checkboxgroup", "select"].includes(
              field.controlType
            ) &&
            field.options &&
            field.options.length > 0
          ) {
            for (const option of field.options) {
              await axios.post(
                `http://localhost:8081/api/question-options/create/${savedQuestion.id}`,
                {
                  optionText: option,
                  value: option.toLowerCase().replace(/\s+/g, "-"),
                }
              );
            }
          }
        }
      }

      toast.success("Form saved successfully!");
      navigate(`/preview/${id}`);
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("Failed to save the form.");
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
          onClick={handleSubmitForm}
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
