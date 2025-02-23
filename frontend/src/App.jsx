import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
])

function App() {
  
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
