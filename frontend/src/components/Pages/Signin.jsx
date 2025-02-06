import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { FaHome } from "react-icons/fa";

const Signin = () => {

  const navigate = useNavigate()

  const handleSignup = (e) =>{
    e.preventDefault();
    navigate('/sign-up-confirmation')
  }

  return (
    <div className="flex h-screen">

      <div className="flex fixed top-0 justify-between items-center h-[8vh] w-[100vw] bg-black bg-opacity-50 z-[20] px-4 sm:px-8">

         <Link to={"/"} className="Logo_">
           <img
             src={Logo}
             alt="Logo"
             height={100}
             width={160}
           />
         </Link>
        <div className="flex text-white align-middle sm:text-lg">
          <Link to="/"className="flex">Home<FaHome className="mx-1 my-auto"/></Link>
        </div>
      </div>

      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className="text-3xl font-bold mb-2 font-libreCaslon">Welcome, Voyager</h1>
        <p className="text-gray-500 mb-6 font-poppins">Create a free account</p>

        <form className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-poppins">Email address</label>
            <input
              type="email"
              placeholder="Email address"
              className=" font-agdasima w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-poppins">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full font-agdasima p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-poppins">Repeat password</label>
            <input
              type="password"
              placeholder="Repeat password"
              className="w-full font-agdasima p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button className="w-full font-agdasima bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          onClick={e=>handleSignup(e)}
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-gray-600 font-poppins">
          Already have an account? <Link to='/log-in' className="text-purple-600 font-agdasima">Log in</Link>
        </p>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 bg-purple-200 justify-center items-center">
        <div className=" w-full h-full">
          <img src="https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Illustration" 
          className="w-full object-cover h-full" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
