import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import DraggableField from './DraggableField';
import { Field, ErrorMessage } from 'formik';

const SortableFieldList = ({ fields, onFieldsChange, errors, 
  touched, onDelete }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  console.log(fields);
  const onDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex(item => item.id === active.id);
      const newIndex = fields.findIndex(item => item.id === over.id);
      
      const newItems = [...fields];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      
      onFieldsChange(newItems);
    }
  };
  const handleLabelChange = (id, newLabel) => {
    onFieldsChange(fields.map(field =>
      field.id === id ? { ...field, label: newLabel } : field
    ));
  };
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block mb-2">
              {field.label}
            </label>
            <Field
              type={field.type}
              id={field.id}
              name={field.id.replace('-field', '')}
              className={`w-full px-3 py-2 border rounded ${
                touched[field.id.replace('-field', '')] && 
                errors[field.id.replace('-field', '')] 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            />
            <ErrorMessage 
              name={field.id.replace('-field', '')} 
              component="div" 
              className="text-red-500 text-sm mt-1" 
            />
          </div>
        );
      
      case 'radio':
        return (
          <div key={field.id} className="mb-4">
            <label className="block mb-2">{field.label}</label>
            {field.options.map((option) => (
              <label key={option} className="inline-flex items-center mr-4">
                <Field
                  type="radio"
                  name={field.id.replace('-field', '')}
                  value={option}
                  className="form-radio"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
            <ErrorMessage 
              name={field.id.replace('-field', '')} 
              component="div" 
              className="text-red-500 text-sm mt-1" 
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    
    <DndContext 
      collisionDetection={closestCenter} 
      sensors={sensors} 
      onDragEnd={onDragEnd}
    >
      <SortableContext 
        items={fields.map(field => field.id)} 
        strategy={verticalListSortingStrategy}
      >
        {fields.length === 0 ? (
          <p className="text-gray-400 p-4 border-2 border-dashed border-gray-300 text-center rounded">
            Drag fields here to build your form
          </p>
        ) : (
          fields.map((field) => (
            <DraggableField key={field.id} field={field}  onLabelChange={handleLabelChange}  onDelete={onDelete}
            />
          ))
        )}
      </SortableContext>
    </DndContext>
  );
};

export default SortableFieldList;