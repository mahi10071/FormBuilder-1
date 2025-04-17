import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ImageUpload from "./ImageUpload";
import FileUpload from "./FileUpload";

const FieldRenderer = ({ field, onUpdateField }) => {
  const [options, setOptions] = useState(field.options || []);
  const [newOption, setNewOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [maxStars, setMaxStars] = useState(5);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (field.id === "name") {
      if (!/^[a-zA-Z\s]*$/.test(inputValue)) {
        setError("Only alphabets and spaces are allowed.");
        return;
      } else {
        setError("");
      }
    }

    setValue(inputValue);

    if (field.required && !inputValue.trim()) {
      setError("This field is required.");
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
            onBlur={handleBlur}
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

    case "number":
      return (
        <div className="mb-2">
          <input
            type="text"
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
            value={value}
            onChange={(e) => {
              const inputValue = e.target.value;

              if (field.id === "phone") {
                if (/^\d{0,10}$/.test(inputValue)) {
                  setValue(inputValue);
                  setError("");
                } else {
                  setError("Phone number must be exactly 10 digits.");
                }
              } else {
                if (/^-?\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                  setValue(inputValue);
                  setError("");
                } else {
                  setError("Only numbers are allowed.");
                }
              }
            }}
            onPaste={(e) => {
              const pastedText = e.clipboardData.getData("text");

              if (field.id === "phone") {
                if (!/^\d{10}$/.test(pastedText)) {
                  e.preventDefault();
                  setError("Phone number must be exactly 10 digits.");
                }
              } else if (!/^-?\d*\.?\d*$/.test(pastedText)) {
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
    case "time":
      return (
        <div className="mb-2">
          <input
            type="time"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required={field.required}
            className="w-full p-2 border rounded shadow-sm"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );

    case "rating":
      return (
        <div className="mb-2">
          {field.type === "rating" && (
            <>
              <div className="relative mb-2">
                <label className="block mb-1 text-sm font-medium">Levels</label>
                <select
                  className="w-full p-2 border rounded shadow-sm"
                  value={maxStars}
                  onChange={(e) => setMaxStars(Number(e.target.value))}
                >
                  {[...Array(9)].map((_, index) => {
                    const stars = index + 2;
                    return (
                      <option key={stars} value={stars}>
                        {stars}
                      </option>
                    );
                  })}
                </select>
              </div>

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
      switch (field.id) {
        case "company-logo":
          return <ImageUpload field={field} label="Company Logo" />;
        case "image-header":
          return <ImageUpload field={field} label="Header Image" />;
        case "image-footer":
          return <ImageUpload field={field} label="Footer Image" />;
        case "file":
          return <FileUpload field={field} label="Upload File" />;
        default:
          return null;
      }

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
