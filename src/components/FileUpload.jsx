import React, { useState } from "react";

const FileUpload = ({ field, label }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
  };

  return (
    <div className="mb-4">
      <input
        id={`file-upload-${field.id}`}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:border-blue-500 transition-colors"
        onClick={() =>
          document.getElementById(`file-upload-${field.id}`).click()
        }
      >
        {fileName ? (
          <div className="text-green-600 font-semibold break-all">
            {fileName}
          </div>
        ) : (
          <p className="text-gray-500">
            Click to upload file (Image, PDF, Excel, etc.)
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
