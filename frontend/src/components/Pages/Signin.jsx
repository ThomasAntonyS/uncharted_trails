import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.webp";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../../Context/UserContextProvider";

const Signin = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    cnf_password: "",
  });

  const [showPassword, setShowPassword] = useState("password");
  const [showCnfPassword, setShowCnfPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserEmail, setAlertBox } = useContext(UserContext);

  document.title = "Uncharted Trails | SignUp";

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.phone_number ||
      !registerData.password ||
      !registerData.cnf_password
    ) {
      setLoading(false);
      setAlertBox({
        isOpen: true,
        message: "Please fill in all fields.",
        isError: true,
      });
      return;
    }
    setLoading(true);

    if (registerData.password !== registerData.cnf_password) {
      setLoading(false);
      setAlertBox({
        isOpen: true,
        message: "Passwords don't match.",
        isError: true,
      });
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/sign-up`, registerData)
      .then((res) => {
        if (res.status === 200) {
          setUserEmail(registerData.email);
          setAlertBox({
            isOpen: true,
            message: "Account created! Please verify your email.",
            isError: false,
          });
          navigate("/sign-up-confirmation");
        }
      })
      .catch((err) => {
        let message = "An unexpected error occurred. Please try again.";
        let isError = true;

        if (err.response) {
          const serverMessage = err.response.data.message;
          const statusCode = err.response.status;

          switch (serverMessage) {
            case "Email already exists but is unverified. Please check your email for the verification code or try logging in.":
              message = "Email already exists but is unverified. Redirecting to confirmation page.";
              setUserEmail(registerData.email);
              navigate("/sign-up-confirmation");
              break;
            case "An account with this email already exists.":
              message = "An account with this email already exists. Please try logging in.";
              break;
            case "Failed to send verification email. Please try again.":
              message = "Failed to send verification email. Please try signing up again.";
              break;
            default:
              if (statusCode === 409) {
                message = serverMessage || "Conflict: Data already exists.";
              } else if (statusCode === 500) {
                message = serverMessage || "An internal server error occurred. Please try again later.";
              } else {
                message = serverMessage || `An unexpected server error occurred (Status: ${statusCode}).`;
              }
              break;
          }
        } else if (err.request) {
          message = "No response from the server. Please check your internet connection.";
        } else {
          message = `Error: ${err.message}`;
        }

        setAlertBox({
          isOpen: true,
          message: message,
          isError: isError,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleShowCnfPassword = () => {
    setShowCnfPassword((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="flex h-[100vh] ">
      <div className="flex fixed top-0 justify-between items-center h-[8vh] w-[100vw] bg-black bg-opacity-50 z-[20] px-4 sm:px-8">
        <Link to={"/"} className="Logo_">
          <img src={Logo} alt="Logo" height={100} width={160} />
        </Link>
        <div className="flex text-white align-middle sm:text-lg font-libreCaslon font-bold bg-black px-2 py-1 rounded-sm bg-opacity-65">
          <Link to="/" className="flex">
            <FaHome className="mx-1 my-auto" />
            Home
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-4 bg-white">
        <h1 className="text-3xl font-bold mb-2 font-libreCaslon">
          Welcome, Voyager
        </h1>
        <p className="text-gray-500 mb-6 font-poppins">Create a free account</p>

        <form className="w-full max-w-md" onSubmit={handleSignup}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
              className="font-poppins w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              className="font-poppins w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              minLength={10}
              maxLength={10}
              placeholder="Phone Number"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  phone_number: e.target.value,
                })
              }
              className="font-poppins w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <input
              type={showPassword}
              placeholder="Password"
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              className="w-full font-poppins p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex align-middle w-full gap-x-2 font-poppins text-gray-950">
              <input
                type="checkbox"
                className=" cursor-pointer"
                onChange={handleShowPassword}
              />{" "}
              <p>Show password</p>
            </div>
          </div>

          <div className="mb-4">
            <input
              type={showCnfPassword}
              placeholder="Repeat password"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  cnf_password: e.target.value,
                })
              }
              className="w-full font-poppins p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex align-middle w-full gap-x-2 font-poppins text-gray-950 ">
              <input
                type="checkbox"
                className=" cursor-pointer"
                onChange={handleShowCnfPassword}
              />{" "}
              <p>Show password</p>
            </div>
          </div>

          <button
            className="w-full font-poppins tracking-wide bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            type="submit"
          >
            {loading ? "Signing in..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-gray-600 font-poppins">
          Already have an account?{" "}
          <Link to="/log-in" className="text-purple-600 font-poppins underline">
            Log in
          </Link>
        </p>
      </div>

      <div className="hidden md:flex w-1/2 bg-purple-200 justify-center items-center">
        <div className="w-full h-full">
          <img
            src="https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Illustration"
            className="w-full object-cover h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;