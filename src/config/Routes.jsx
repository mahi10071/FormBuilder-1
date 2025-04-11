import React from "react";
import { Forms } from "../components/Forms";
import FormBuilder from "../components/FormBuilder";
import { Routes, Route } from "react-router-dom";
import Preview from "../components/Preview";

const ScreenRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Forms />}></Route>
      <Route path="/buildform/:id" element={<FormBuilder />}></Route>
      <Route path="/preview/:id" element={<Preview />}></Route>
    </Routes>
  );
};

export default ScreenRouter;
