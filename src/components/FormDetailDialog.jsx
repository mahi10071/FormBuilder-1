import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormDetailDialog = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    try {
      const response = await fetch("http://localhost:8084/api/forms/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const form = await response.json();

        navigate(`/buildform/${form.id}`);

        setOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to create form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the form.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Custom Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            name="title"
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            name="description"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDetailDialog;
