import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex fixed top-0 justify-between items-center h-[8vh] w-[100vw] bg-black bg-opacity-25 z-[20] px-4 sm:px-8">
      {/* Logo Section */}
      <Link to={"/"} className="Logo_">
        <img
          src={Logo}
          alt="Logo"
          height={100}
          width={160}
        />
      </Link>

      {/* Navigation Links for Desktop */}
      <div className="Nav_Links_ hidden md:flex items-center space-x-6 font-poppins text-[1rem] sm:text-[1.1rem] text-white">
        <Link to={"/"}>Home</Link>
        <Link to={"/explore"}>Explore</Link>
        <Link to={"/blog"}>Blog</Link>
        <Link to={"/pricing"}>Pricing</Link>
      </div>

      {/* Profile and Sign-In Links for Desktop */}
      <div className="Profile_SignIn hidden md:flex items-center space-x-4 font-poppins text-[1rem] sm:text-[1.1rem] text-white">
        <Link to={"/"}>Login</Link>
        <Link to={"/"} className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition">
          Sign Up
        </Link>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="flex md:hidden items-center">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          {/* Hamburger icon */}
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-[8vh] left-0 w-full bg-black bg-opacity-90 text-white z-40 md:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              to={"/"}
              className="text-[1.1rem] font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={"/explore"}
              className="text-[1.1rem] font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to={"/blog"}
              className="text-[1.1rem] font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to={"/pricing"}
              className="text-[1.1rem] font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col items-center space-y-2 mt-4">
              <Link
                to={"/"}
                className="text-[1.1rem] font-poppins"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to={"/"}
                className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
