"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { adminLogout } from "@/redux/adminSlice";
import { clearReversals } from "@/redux/reversalSlice";
import { clearTransactions } from "@/redux/transactionSlice";
import { FaUserCircle, FaCoins } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle logout
  const logoutHandler = () => {
    dispatch(logout());
    dispatch(adminLogout());
    dispatch(clearReversals());
    dispatch(clearTransactions());
    navigate("/");
    setIsMenuOpen(false);
  };

  // Navigation links
  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/transactions", label: "Transactions" },
    { path: "/send", label: "Send Money" },
    { path: "/reversals", label: "Reversals" },
  ];

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 p-4 bg-[#000428] bg-opacity-30 backdrop-blur-lg text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 z-10">
          <FaCoins className="text-yellow-400 text-2xl" />
          <span className="text-2xl font-bold font-['Poppins',_sans-serif] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sitcoin
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-200 hover:text-blue-300 ${
                isActive(link.path) ? "text-blue-400 font-medium" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={logoutHandler}
            className="transition-colors duration-200 hover:text-red-300"
          >
            Logout
          </button>
          <Link
            to="/profile"
            className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200"
          >
            <FaUserCircle size={24} />
            <span>{currentUser?.fullname?.split(" ")[0] || "Profile"}</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none menu-button z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#000428] bg-opacity-95 backdrop-blur-lg flex flex-col md:hidden pt-20 px-6 mobile-menu z-0"
            >
              <div className="flex flex-col">
                {/* Mobile User Info */}
                <div className="flex items-center space-x-3 pb-6 border-b border-white/10 bg-[#000428]">
                  <FaUserCircle size={36} className="text-blue-400" />
                  <div>
                    <p className="font-medium">
                      {currentUser?.fullname || "User"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {currentUser?.email || "user@example.com"}
                    </p>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="pt-6 flex flex-col space-y-4 bg-[#000428]">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-lg py-2 transition-colors duration-200 ${
                        isActive(link.path)
                          ? "text-blue-400 font-medium"
                          : "text-white hover:text-blue-300"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="mt-auto pt-6 border-t border-white/10 bg-[#000428]">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 py-3 text-lg hover:text-blue-300 transition-colors duration-200"
                  >
                    <FaUserCircle size={20} />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="flex items-center space-x-2 py-3 text-lg text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
