import React, { useState } from "react";

const ImageUpload = ({ field, label }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-4">
      <input
        id={`upload-${field.id}`}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <div
        className="border-2 border-dashed p-4 cursor-pointer text-center"
        onClick={() => document.getElementById(`upload-${field.id}`).click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-40 mx-auto" />
        ) : (
          <p>Click to upload image</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
