import React from 'react';

const FieldRenderer = ({ field }) => {

 

  switch (field.type) {
    case 'text':
      return (
        <div className="mb-2">
          <input
            type="text"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>
      );
    case 'email':
      return (
        <div className="mb-2">
          <input
            type="email"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>
      );
    case 'radio':
      return (
        <div className="mb-2">
          <div className="flex items-center space-x-4">
            {field.options && field.options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input type="radio" name={field.label.toLowerCase()} className="mr-2" />
                {option}
              </label>
            ))}
          </div>
        </div>
      );
    case 'dropdown':
      return (
        <div className="mb-2">
          <select className="w-full p-2 border rounded shadow-sm">
            <option value="">Select {field.label}</option>
            {field.options && field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div className="mb-2">
            <input type="checkbox" className="mr-2" />
            
        </div>
      );
    case 'image':
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
          return;
        }
    
        const maxSizeInBytes = 5 * 1024 * 1024; 
        if (file.size > maxSizeInBytes) {
          alert('File is too large. Maximum file size is 5MB');
          return;
        }
    
        const reader = new FileReader();
        reader.onloadend = () => {
          field.onChange({
            target: {
              name: field.name,
              value: file, 
              preview: reader.result 
            }
          });
        };
        reader.readAsDataURL(file);
      };
      return (
        <div className="mb-2">
        <label htmlFor={`file-upload-${field.name}`} className="block mb-2">
          {field.label}
        </label>
        <input
          id={`file-upload-${field.name}`}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        <div 
          className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
          onClick={() => document.getElementById(`file-upload-${field.name}`).click()}
        >
          {field.value?.preview ? (
            <img 
              src={field.value.preview} 
              alt="Preview" 
              className="max-w-full max-h-48 mx-auto object-contain"
            />
          ) : (
            <p className="text-gray-500">
              Drag and drop an image or click to upload
            </p>
          )}
        </div>
      </div>
      );
    default:
      return (
        <div className="mb-2">
          <input
            type="text"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>
      );
  }
};

export default FieldRenderer;