import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Import dropdown icon
import { FaStar } from "react-icons/fa";

const FieldRenderer = ({ field, onUpdateField }) => {
  const [options, setOptions] = useState(field.options || []);
  const [newOption, setNewOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [maxStars, setMaxStars] = useState(5);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (field.required && !e.target.value.trim()) {
      setError(`This field is required.`);
    } else {
      setError("");
    }
  };
  const handleBlur = () => {
    if (field.type === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setError("Please enter a valid email address.");
      } else {
        setError("");
      }
    }
  };

  const handleAddOption = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (newOption.trim() !== "") {
      const updatedOptions = [...options, newOption.trim()];
      setOptions(updatedOptions);
      setNewOption("");

      if (onUpdateField) {
        onUpdateField(field.id, { ...field, options: updatedOptions });
      }
    }
  };

  const handleDeleteOption = (event, index) => {
    event.preventDefault();
    event.stopPropagation();

    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);

    if (onUpdateField) {
      onUpdateField(field.id, { ...field, options: updatedOptions });
    }
  };

  const handleEditOption = (event, index, newValue) => {
    event.preventDefault();
    event.stopPropagation();

    const updatedOptions = options.map((option, i) =>
      i === index ? newValue : option
    );
    setOptions(updatedOptions);

    if (onUpdateField) {
      onUpdateField(field.id, { ...field, options: updatedOptions });
    }
  };
  const handleRatingChange = (rating) => {
    setValue(rating);
    if (onUpdateField) {
      onUpdateField(field.id, { ...field, value: rating });
    }
  };

  switch (field.type) {
    case "text":
      return (
        <div className="mb-2">
          <input
            type="text"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            value={value}
            onChange={handleChange}
            required={field.required}
            className={`w-full p-2 border rounded shadow-sm ${
              field.required && error ? "border-red-500" : ""
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    case "email":
      return (
        <div className="mb-2">
          <input
            type="email"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur} // Validates when leaving the field
            required={field.required}
            className={`w-full p-2 border rounded shadow-sm ${
              field.required && error ? "border-red-500" : ""
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    case "radio":
      return (
        <div className="mb-2">
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.label.toLowerCase()}
                  className="mr-2"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleEditOption(e, index, e.target.value)}
                  className="border p-1 rounded w-full"
                />
                <button
                  type="button"
                  onClick={(e) => handleDeleteOption(e, index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
            <div className="flex mt-2">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add option"
                className="border p-1 rounded w-full"
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-500 text-white px-2 ml-2 rounded"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      );

    case "dropdown":
      return (
        <div className="mb-2">
          <div className="relative">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="w-full p-2 border rounded shadow-sm flex justify-between items-center bg-white"
            >
              Select {field.label}
              <FaChevronDown
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border rounded shadow-lg z-10 p-2">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-1"
                  >
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleEditOption(e, index, e.target.value)
                      }
                      className="border p-1 rounded w-full mr-2"
                    />
                    <button
                      type="button"
                      onClick={(e) => handleDeleteOption(e, index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ❌
                    </button>
                  </div>
                ))}
                <div className="flex mt-2">
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Add option"
                    className="border p-1 rounded w-full"
                  />
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="bg-blue-500 text-white px-2 ml-2 rounded"
                  >
                    ➕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    // case "checkbox":
    //   return (
    //     <div className="mb-2">
    //       <input type="checkbox" className="mr-2" required={field.required} />
    //     </div>
    //   );
    case "checkbox":
      return (
        <div className="mb-2">
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="checkbox" className="mr-2" value={option} />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleEditOption(e, index, e.target.value)}
                  className="border p-1 rounded w-full"
                />
                <button
                  type="button"
                  onClick={(e) => handleDeleteOption(e, index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
            <div className="flex mt-2">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add option"
                className="border p-1 rounded w-full"
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-500 text-white px-2 ml-2 rounded"
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      );
    //positive,negative,decimal numbers only
    case "number":
      return (
        <div className="mb-2">
          <input
            type="text"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            value={value}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (/^-?\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                // Allows positive, negative, and decimal numbers
                setValue(inputValue);
                setError("");
              } else {
                setError("Only numbers are allowed.");
              }
            }}
            onPaste={(e) => {
              const pastedText = e.clipboardData.getData("text");
              if (!/^-?\d*\.?\d*$/.test(pastedText)) {
                e.preventDefault();
                setError("Only numbers are allowed.");
              }
            }}
            required={field.required}
            className={`w-full p-2 border rounded shadow-sm ${
              field.required && error ? "border-red-500" : ""
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    case "date":
      return (
        <div className="mb-2">
          <input
            type="date"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required={field.required}
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>
      );

    case "rating":
      return (
        <div className="mb-2">
          {field.type === "rating" && (
            <>
              {/* <label className="block mb-1 font-semibold">{field.label}</label> */}

              {/* Dropdown to select max stars */}
              <div className="relative mb-2">
                <label className="block mb-1 text-sm font-medium">Levels</label>
                <select
                  className="w-full p-2 border rounded shadow-sm"
                  value={maxStars}
                  onChange={(e) => setMaxStars(Number(e.target.value))}
                >
                  {[...Array(9)].map((_, index) => {
                    const stars = index + 2; // From 2 to 10
                    return (
                      <option key={stars} value={stars}>
                        {stars}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Star rating system */}
              <div className="flex space-x-1">
                {[...Array(maxStars)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={ratingValue}
                      size={24}
                      className={`cursor-pointer ${
                        ratingValue <= value
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRatingChange(ratingValue)}
                    />
                  );
                })}
              </div>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </>
          )}
        </div>
      );
    case "image":
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedTypes.includes(file.type)) {
          alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
          return;
        }

        const maxSizeInBytes = 5 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
          alert("File is too large. Maximum file size is 5MB");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          field.onChange({
            target: {
              name: field.name,
              value: file,
              preview: reader.result,
            },
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
            onClick={() =>
              document.getElementById(`file-upload-${field.name}`).click()
            }
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
            value={value}
            onChange={handleChange}
            required={field.required}
            className={`w-full p-2 border rounded shadow-sm ${
              field.required && error ? "border-red-500" : ""
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
  }
};

export default FieldRenderer;
