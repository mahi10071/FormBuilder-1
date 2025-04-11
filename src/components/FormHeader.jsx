import { Box, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FormHeader = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [isEditingFormName, setIsEditingFormName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const fetchFormData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/forms/detailsUsingId/${id}`
      );
      if (response.status === 200) {
        const { title, description } = response.data;
        setFormData({
          title: title || "Default Form",
          description: description || "This is the default description",
        });
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const updateFormInDB = async () => {
    try {
      const formDTO = {
        title: formData.title,
        description: formData.description,
      };

      if (id) {
        await axios.put(
          `http://localhost:8081/api/forms/update/${id}`,
          formDTO
        );
        console.log("Form updated successfully!");
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  const handleSaveField = (field) => {
    if (field === "title") {
      setIsEditingFormName(false);
    } else if (field === "description") {
      setIsEditingDescription(false);
    }

    updateFormInDB();
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchFormData();
  }, [id]);

  return (
    <Box className="flex flex-col items-center space-x-4">
      <Typography variant="h5" className="font-semibold">
        {!isEditingFormName ? (
          <span
            className="cursor-pointer"
            onClick={() => setIsEditingFormName(true)}
          >
            {formData.title}
          </span>
        ) : (
          <TextField
            autoFocus
            value={formData.title}
            onBlur={() => handleSaveField("title")}
            onChange={(e) => handleChange("title", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveField("title");
            }}
            variant="outlined"
            size="small"
            fullWidth
            //  className="border-b-2 border-gray-500 focus:border-black-600 focus:outline-none"
          />
        )}
      </Typography>

      <Typography variant="body1">
        {!isEditingDescription ? (
          <span
            className="cursor-pointer"
            onClick={() => setIsEditingDescription(true)}
          >
            {formData.description}
          </span>
        ) : (
          <TextField
            autoFocus
            value={formData.description}
            onBlur={() => handleSaveField("description")}
            onChange={(e) => handleChange("description", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveField("description");
            }}
            size="small"
            fullWidth
          />
        )}
      </Typography>
    </Box>
  );
};

export default FormHeader;
