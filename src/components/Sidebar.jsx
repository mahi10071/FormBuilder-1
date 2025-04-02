import React, { useState } from 'react';
import {
  Text,Type,ChevronDown, ListOrdered,Hash, AlignJustify, CheckSquare,
  List, Calendar, FileInput, Radio ,CircleDot
} from 'lucide-react';
 
const fieldIcons = {
  text: <Type size={16} className="mr-2 text-black-500" />,
  number: <ListOrdered size={16} className="mr-2 text-black-500" />,
  textarea: <AlignJustify size={16} className="mr-2" />,
  checkbox: <CheckSquare size={16} className="mr-2" />,
  checkboxes: <CheckSquare size={16} className="mr-2" />,
  dropdown: <ChevronDown size={18} className="mr-2 text-black-500" />,
  date: <Calendar size={16} className="mr-2" />,
  file: <FileInput size={16} className="mr-2" />,
  radio: <CircleDot size={16} className="mr-2 text-black-500" />,
};
 
const Sidebar = ({ dataFields, initialFields, customFields }) => {
  const [activeTab, setActiveTab] = useState('inputTypes');
  const [dataExpanded, setDataExpanded] = useState(true);
  const [fieldsExpanded, setFieldsExpanded] = useState(true);
 
  return (
    <div className="w-100 border rounded-lg mr-15">
      <div className="border-b">
        <div
          className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
          onClick={() => setDataExpanded(!dataExpanded)}
        >
          <h3>Data Section</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transform ${dataExpanded ? 'rotate-0' : 'rotate-180'}`}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
        {dataExpanded && (
          <div className="p-4 grid grid-cols-2 gap-2">
            {dataFields.map((field) => (
              <button
                key={field.id}
                className="flex items-center border rounded p-2 text-sm cursor-pointer hover:bg-gray-50"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("field", JSON.stringify(field))}
              >
                {fieldIcons[field.type] || <Text size={16} className="mr-2" />}
                {field.label}
              </button>
            ))}
          </div>
        )}
      </div>
 
      <div>
        <div
          className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
          onClick={() => setFieldsExpanded(!fieldsExpanded)}
        >
          <h3>Fields</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transform ${fieldsExpanded ? 'rotate-0' : 'rotate-180'}`}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
 
        {fieldsExpanded && (
          <>
            <div className="flex border-b">
              <button
                className={`flex-1 py-2 text-sm ${activeTab === 'inputTypes' ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab('inputTypes')}
              >
                Standard Fields
              </button>
              <button
                className={`flex-1 py-2 text-sm ${activeTab === 'customFields' ? 'border-b-2 border-black' : ''}`}
                onClick={() => setActiveTab('customFields')}
              >
                User-Defined Fields
              </button>
            </div>
 
            {activeTab === 'inputTypes' && fieldsExpanded && (
              <div className="p-4 grid grid-cols-2 gap-2">
                {initialFields.map((field) => (
                  <button
                    key={field.id}
                    className="flex items-center border rounded p-2 text-sm cursor-pointer hover:bg-gray-50"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("field", JSON.stringify(field))}
                  >
                    {fieldIcons[field.type] || <Text size={16} className="mr-2" />}
                    {field.label}
                  </button>
                ))}
              </div>
            )}
 
            {activeTab === 'customFields' && fieldsExpanded && customFields && customFields.length > 0 && (
              <div className="p-4">
                <p className="font-semibold mb-2">Select a custom field type:</p>
               
                <div className="grid grid-cols-2 gap-2">
                  {customFields.map((field) => (
                    <button
                      key={field.id}
                      className="flex items-center border rounded p-2 text-sm cursor-pointer hover:bg-gray-50"
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("field", JSON.stringify(field))}
                    >
                      {fieldIcons[field.type] || <Text size={16} className="mr-2" />}
                      {field.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
 
            {activeTab === 'customFields' && fieldsExpanded && (!customFields || customFields.length === 0) && (
              <div className="p-4">
                <p>No custom fields available.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
 
export default Sidebar;

