import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import { Preview, Save, Publish, Add } from "@mui/icons-material";
import IconButton from "./IconButton";
import { useFormContext } from "../context/FormContext";

export const Navbar = () => {
  const { addPage } = useFormContext();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar className="flex justify-end items-center">
        <Box className="flex space-x-2">
          <IconButton text="Add Page" color="text-blue-500" onClick={addPage}>
            <Add fontSize="medium" />
          </IconButton>
          <IconButton text="Preview" color="text-red-500">
            <Preview fontSize="medium" />
          </IconButton>
          <IconButton text="Save" color="text-green-500">
            <Save fontSize="medium" />
          </IconButton>
          <IconButton text="Publish" color="text-yellow-500">
            <Publish fontSize="medium" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
