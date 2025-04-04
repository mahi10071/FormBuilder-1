import React from "react";
import { BrowserRouter } from "react-router-dom";
import ScreenRouter from "./config/Routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <div>
          <main>
            <ScreenRouter />
          </main>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
