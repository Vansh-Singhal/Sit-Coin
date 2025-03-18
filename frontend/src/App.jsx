import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Reversals from "./pages/Reversals";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },

  // AUTH ROUTES
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  //USER ROUTES
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
  {
    path: "/reversals",
    element: <Reversals />,
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
