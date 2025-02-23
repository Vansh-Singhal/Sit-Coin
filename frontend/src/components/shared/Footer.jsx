import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 right-0 z-50 p-4 bg-[#000428] bg-opacity-30 backdrop-blur-lg text-white shadow-lg flex justify-between items-center">
      {/* Left Section - Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="">
          Sitcoin 💰
        </Link>
      </div>

      

      {/* Center Section - Links */}
      <div className="flex space-x-6">
        <Link to="/about" className="">
          About
        </Link>
        <Link to="/privacy" className="">
          Privacy Policy
        </Link>
        <Link to="/terms" className="">
          Terms of Service
        </Link>
      </div>

      {/* Right Section - Social Media Icons */}
      <div className="flex space-x-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} className="hover:text-gray-400" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} className="hover:text-gray-400" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} className="hover:text-gray-400" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
