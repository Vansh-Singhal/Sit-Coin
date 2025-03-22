import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Reversals from "./pages/Reversals.jsx";
import Transfer from "./pages/Transfer.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import ProtectedAdminRoute from "./components/protectedRoutes/ProtectedAdminRoute.jsx";
import ProtectedUserRoute from "./components/protectedRoutes/ProtectedUserRoute";
import Profile from "./pages/Profile";

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
    element: (
      <ProtectedUserRoute>
        <Dashboard />
      </ProtectedUserRoute>
    ),
  },
  {
    path: "/transactions",
    element: (
      <ProtectedUserRoute>
        <Transactions />
      </ProtectedUserRoute>
    ),
  },
  {
    path: "/reversals",
    element: (
      <ProtectedUserRoute>
        <Reversals />
      </ProtectedUserRoute>
    ),
  },
  {
    path: "/send",
    element: (
      <ProtectedUserRoute>
        <Transfer />
      </ProtectedUserRoute>
    ),
  },
  {
    path : "/profile",
    element : (
      <ProtectedUserRoute><Profile/></ProtectedUserRoute>
    )
  },
  //ADMIN AUTH AND ROUTES
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
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
