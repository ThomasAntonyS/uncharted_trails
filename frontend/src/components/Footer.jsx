import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import axios from 'axios';
import { UserContext } from '../Context/UserContextProvider';


const Footer = () => {
  const [email, setEmail] = useState("");
  const [btnSubmit, setBtnSubmit] = useState(false);

  const navigate = useNavigate();
  const { setAlertBox } = useContext(UserContext); 

  const handleNewsLetter = async (e) => {
    e.preventDefault();
    setBtnSubmit(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/news-letter`, { email_id: email });
      if (res.status === 200) {
        setAlertBox({
          isOpen: true,
          message: "Subscribed successfully!",
          isError: false,
        });
        setEmail(""); 
      } else {
        setAlertBox({
          isOpen: true,
          message: "Something went wrong. Please try again.",
          isError: true,
        });
      }
    } catch (err) {
      console.error(err);
      let errorMessage = "An unexpected error occurred.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.request) {
        errorMessage = "No response from the server. Please check your network connection.";
      } else {
        errorMessage = err.message;
      }
      setAlertBox({
        isOpen: true,
        message: errorMessage,
        isError: true,
      });
    } finally {
      setBtnSubmit(false);
    }
  };

  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-max mt-10 text-white pb-4 bg-[linear-gradient(180deg,_white_15%,_#1f2937_15%)]">
      <div className="relative flex flex-col sm:flex-row items-center border-2 bg-white rounded-md mx-auto mb-10 p-6 max-w-4xl text-gray-800 sm:border-n">
        <h2 className="text-2xl sm:text-3xl font-libreCaslon mb-4 sm:mb-0 sm:mr-20 text-gray-800">Our Newsletter</h2>
        <form className="flex flex-col sm:flex-row gap-4 w-full max-w-lg" onSubmit={handleNewsLetter}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow font-agdasima tracking-wide py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition font-libreCaslon tracking-wide"
            disabled={btnSubmit}
          >
            {btnSubmit ? "Processing..." : "Subscribe"}
          </button>
        </form>
      </div>
      <div className="container mx-auto lg:px-4 w-full sm:w-[90%] lg:w-[85%]">
        <div className="flex flex-col w-full sm:flex-row justify-between gap-10 sm:gap-5 lg:gap-10">
          <div className="flex flex-col items-center lg:items-start mt-4">
            <h3 className="text-2xl font-libreCaslon">Uncharted Trails</h3>
            <p className="mt-2 text-gray-400 font-poppins text-center lg:text-left">
              Copyright © Uncharted Trails 2024. All rights reserved
            </p>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-lg font-libreCaslon">Menu</h4>
            <ul className="mt-2 space-y-1 text-gray-400 font-poppins text-center lg:text-left">
              <li><Link onClick={(e) => handleClick(e, "/")}>Home</Link></li>
              <li><Link onClick={(e) => handleClick(e, "/explore")}>Explore</Link></li>
              <li><Link onClick={(e) => handleClick(e, "/blog")}>Blog</Link></li>
              <li><Link onClick={(e) => handleClick(e, "/pricing")}>Pricing</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-lg font-libreCaslon">Information</h4>
            <ul className="mt-2 space-y-1 text-gray-400 font-poppins text-center lg:text-left">
              <li>Destinations</li>
              <li>Support</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-lg font-libreCaslon">Contact Info</h4>
            <ul className="mt-2 space-y-1 text-gray-400 font-poppins text-center lg:text-left">
              <li>+123 456 789</li>
              <li>info@unchartedtrails.com</li>
              <li>935, Bengaluru, India</li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-lg font-libreCaslon">Follow us on</h4>
            <div className="flex gap-4 mt-2 text-gray-400">
              <i className='cursor-pointer'><FaFacebook /></i>
              <i className='cursor-pointer'><FaInstagram /></i>
              <i className='cursor-pointer'><FaTwitter /></i>
              <i className='cursor-pointer'><FaLinkedin /></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;