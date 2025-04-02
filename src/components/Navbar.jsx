import React from "react";
import { AppBar, Box, Toolbar, Button as MuiButton } from "@mui/material";
import { Preview, Save, Publish } from "@mui/icons-material";
import IconButton from "./IconButton";

export const Navbar = () => {
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className="flex justify-end items-center">
          <Box className="flex space-x-4">
            <IconButton text="Preview" color="text-red-500">
              <Preview fontSize="small" />
            </IconButton>
            <IconButton text="Save" color="text-green-500">
              <Save fontSize="small" />
            </IconButton>
            <IconButton text="Publish" color="text-yellow-500">
              <Publish fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
