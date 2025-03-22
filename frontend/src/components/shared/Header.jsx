import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { adminLogout } from "@/redux/adminSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let logoutHandler = () => {
    dispatch(logout());
    dispatch(adminLogout());
    navigate("/")
  }

  return (
    <header className="min-h-8 top-0 left-0 right-0 z-50 p-4 bg-[#000428] bg-opacity-30 backdrop-blur-lg text-white shadow-lg flex justify-between items-center text-lg">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        Sitcoin 💰
      </Link>

      {/* Navigation Links */}
      <nav className="flex space-x-6">
        <Link to="/dashboard" className="">Dashboard</Link>
        <Link to="/transactions" className="">Transactions</Link>
        <Link to="/send" className="">Send Money</Link>
        <Link to="/reversals" className="">Reversals</Link>
      </nav>

      <button className="cursor-pointer" onClick={logoutHandler}> Logout </button>
      <div className="flex items-center space-x-2">
        <FaUserCircle size={24} />
        <span className="cursor-pointer ">Profile</span>
      </div>
    </header>
  );
};

export default Header;