import React from 'react';
import {Link} from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="h-max mt-10  text-white pb-4 bg-[linear-gradient(180deg,_white_20%,_#1f2937_20%)]">
          {/* Newsletter Section */}
          <div className="relative flex flex-col sm:flex-row items-center border-2 bg-white rounded-md mx-auto mb-10 p-6 max-w-4xl text-gray-800 sm:border-n">
                <h2 className="text-2xl sm:text-3xl font-libreCaslon mb-4 sm:mb-0 sm:mr-20 text-gray-800">Our Newsletter</h2>
                <form className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow font-agdasima tracking-wider py-2 px-4 rounded-md border border-gray-300 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition"
                  >
                    Subscribe
                  </button>
                </form>
          </div>

          {/* Footer Section */}
          <div className="container mx-auto px-4 w-full sm:w-[90%] lg:w-[85%]">
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              {/* Brand Section */}
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-2xl font-libreCaslon">Uncharted Trails</h3>
                <p className="mt-2 text-gray-400 font-poppins text-center lg:text-left">
                  Copyright © Uncharted Trails 2024. All rights reserved
                </p>
              </div>
    
              {/* Menu Section */}
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-lg font-libreCaslon">Menu</h4>
                <ul className="mt-2 space-y-1 text-gray-400 font-poppins text-center lg:text-left">
                  <li><Link to={'/'} onClick={() => screenTop(0, 0)}>Home</Link></li>
                  <li><Link to={'/explore'} onClick={() => screenTop(0, 0)}>Explore</Link></li>
                  <li><Link to={'/blog'} onClick={() => screenTop(0, 0)}>Blog</Link></li>
                  <li><Link to={'/pricing'} onClick={() => screenTop(0, 0)}>Pricing</Link></li>
                </ul>
              </div>
    
              {/* Information Section */}
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-lg font-libreCaslon">Information</h4>
                <ul className="mt-2 space-y-1 text-gray-400 font-poppins text-center lg:text-left">
                  <li>Destinations</li>
                  <li>Support</li>
                  <li>Terms & Conditions</li>
                  <li>Privacy</li>
                </ul>
              </div>
    
              {/* Contact Info Section */}
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-lg font-libreCaslon">Contact Info</h4>
                <ul className="mt-2 space-y-1 text-gray-400 font-poppins text-center lg:text-left">
                  <li>+123 456 789</li>
                  <li>info@unchartedtrails.com</li>
                  <li>935, Bengaluru, India</li>
                </ul>
              </div>
    
              {/* Social Media Section */}
              <div className="flex flex-col items-center lg:items-start">
                <h4 className="text-lg font-libreCaslon">Follow us on</h4>
                <div className="flex gap-4 mt-2 text-gray-400">
                  <i><FaFacebook/></i>
                  <i><FaInstagram/></i>
                  <i><FaTwitter/></i>
                  <i><FaLinkedin/></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Footer;
