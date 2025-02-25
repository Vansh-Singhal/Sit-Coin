import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
