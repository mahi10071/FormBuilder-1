import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import DraggableField from "./DraggableField";

const SortableFieldList = ({
  fields,
  onFieldsChange,
  errors,
  touched,
  onDelete,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const onDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over.id);

      const newItems = [...fields];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);

      onFieldsChange(newItems);
    }
  };

  const handleLabelChange = (id, newLabel) => {
    onFieldsChange(
      fields.map((field) =>
        field.id === id ? { ...field, label: newLabel } : field
      )
    );
  };

  const handleUpdateField = (id, updatedField) => {
    onFieldsChange(
      fields.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
    onFieldsChange(updatedFields);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={fields.map((field) => field.id)}
        strategy={verticalListSortingStrategy}
      >
        {fields.length === 0 ? (
          <p className="text-gray-400 p-4 border-2 border-dashed border-gray-300 text-center rounded">
            Drag fields here to build your form
          </p>
        ) : (
          fields.map((field) => (
            <DraggableField
              key={field.id}
              field={field}
              onLabelChange={handleLabelChange}
              onDelete={onDelete}
              onUpdateField={handleUpdateField}
            />
          ))
        )}
      </SortableContext>
    </DndContext>
  );
};

export default SortableFieldList;
