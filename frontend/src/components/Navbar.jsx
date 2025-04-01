import React, { useContext, useState } from "react";
import Logo from "../assets/Logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../Context/UserContextProvider";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {loggedIn,userData} = useContext(UserContext)

  const navigate = useNavigate()

  function handleNavigation(e,navLink){
    e.preventDefault()
    navigate(navLink)
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  return (
    <div className="flex fixed top-0 justify-between items-center h-[8vh] w-[100vw] bg-black bg-opacity-25 z-[20] px-4 sm:px-8">
      {/* Logo Section */}
      <Link onClick={e=>handleNavigation(e,"/")} className="Logo_">
        <img
          src={Logo}
          alt="Logo"
          height={100}
          width={160}
        />
      </Link>

      {/* Navigation Links for Desktop */}
      <div className="Nav_Links_ hidden xl:flex items-center space-x-16 font-poppins text-[1rem] sm:text-[1.1rem] text-white">
        <Link onClick={e=>handleNavigation(e,"/")}>Home</Link>
        <Link onClick={e=>handleNavigation(e,"/explore")}>Explore</Link>
        <Link onClick={e=>handleNavigation(e,"/blog")}>Blog</Link>
        <Link onClick={e=>handleNavigation(e,"/pricing")}>Pricing</Link>
      </div>

      {/* Profile and Sign-In Links for Desktop */}
      {
        (loggedIn)?
        <div className="Profile_SignInhidden hidden sm:bg-black sm:bg-opacity-45 rounded-md xl:flex sm:mx-4 items-center space-x-4 font-poppins text-[1rem] text-white">
          <Link to="/profile" className="flex p-2 font-agdasima tracking-widest text-md">
            <span className=" my-auto mr-2 mt-1"><FaUser /></span> {userData.username}
          </Link>
        </div>
        :
        <div className="Profile_SignIn hidden xl:flex items-center space-x-4 font-poppins text-[1rem] sm:text-[1.1rem] text-white">
          <Link to="/log-in">Login</Link>
          <Link to="/sign-up" className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition">
            Sign Up
          </Link>
        </div>
      }

      {/* Mobile Hamburger Menu */}
      <div className="flex xl:hidden items-center">
        <button
          onClick={()=>setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none "
        >
          {/* Hamburger icon */}
          {isMenuOpen ? 
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
           :
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
          }
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-[8vh] left-0 w-full bg-black bg-opacity-90 text-white z-40 xl:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/"
              className="text-[1.1rem] font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="text-[1.1rem] font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/blog"
              className="text-[1.1rem] font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/pricing"
              className="text-[1.1rem] font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            {
              (loggedIn) ?
              <div className="flex flex-col items-center space-y-2 mt-4">
                <Link to="/profile" className=" flex text-[1.1rem] font-poppins ml-4"
                >Profile<span className=" my-auto"><FaCaretRight /></span>
                </Link>
              </div>
              :
              <div className="flex flex-col items-center space-y-2 mt-4">
              <Link
                to="/log-in"
                className="text-[1.1rem] font-poppins"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
            }

          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
