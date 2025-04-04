import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FieldRenderer from "./FieldRenderer";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const DraggableField = ({ field, onLabelChange, onDelete, onUpdateField }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });
  

  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(field.label);
  const [isVisible, setIsVisible] = useState(true);
  const [isRequired, setIsRequired] = useState(field.required || false);

  const handleLabelChange = (e) => setLabel(e.target.value);

  const saveLabel = () => {
    setIsEditing(false);
    onLabelChange(field.id, label);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();

    setIsVisible(false);

    setTimeout(() => onDelete(field.id), 300);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "1rem",
  };
  // const toggleRequired = () => {
  //   const updatedRequired = !isRequired;
  //   setIsRequired(updatedRequired);
  //   //onUpdateField(field.id, { ...field, required: updatedRequired });
  //   if (onUpdateField) {
  //     onUpdateField(field.id, { ...field, required: updatedRequired });
  //   } else {
  //     console.error("onUpdateField is not defined!");
  //   }
  // };

  const toggleRequired = () => {
    const updatedRequired = !isRequired;
    setIsRequired(updatedRequired);

    if (typeof onUpdateField === "function") {
      onUpdateField(field.id, { required: updatedRequired }); // ✅ Now it works!
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="p-2 border border-gray-200 rounded-md hover:border-gray-400 cursor-move bg-white"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scaleY: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          <div className="flex items-center justify-between pb-2">
            {isEditing ? (
              <input
                type="text"
                value={label}
                onChange={handleLabelChange}
                onBlur={saveLabel}
                onKeyDown={(e) => e.key === "Enter" && saveLabel()}
                autoFocus
                className="border-b-2 border-gray-500 focus:border-black-600 focus:outline-none"
              />
            ) : (
              <span className="font-medium">{label}</span>
            )}

            <div className="flex">
              <Tooltip title="Edit" arrow>
                <button
                  className="text-blue-500 p-1 transition duration-300 ease-in-out hover:bg-blue-500/10 hover:rounded-lg hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsEditing(true);
                  }}
                >
                  <Edit fontSize="small" />
                </button>
              </Tooltip>

              <Tooltip title="Delete" arrow>
                <button
                  className="text-red-500 p-1 transition duration-300 ease-in-out hover:bg-red-500/10 hover:rounded-lg hover:scale-105"
                  onClick={handleDelete}
                >
                  <Delete fontSize="small" />
                </button>
              </Tooltip>
            </div>
          </div>

          <FieldRenderer field={{ ...field, label,required: isRequired }} />

          <div className="flex justify-end mt-2">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={isRequired}
                onChange={toggleRequired}
                className="mr-2"
              />
              Required
            </label>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DraggableField;
