import React, { useState, useEffect, useContext } from "react";
import Logo from '../../assets/Logo.webp';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../Context/UserContextProvider';

const Confirmation = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const { setLoggedIn, userEmail, setAlertBox } = useContext(UserContext);

  document.title = "Uncharted Trails | Email-Confirmation";

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/sign-up-confirmation`, { verificationCode, email: userEmail })
      .then(res => {
        if (res.data.message === "Verification successful.") {
          localStorage.setItem('authToken',res.data.token)
          setLoggedIn(true);
          setAlertBox({
            isOpen: true,
            message: "Email verified successfully! Welcome.",
            isError: false
          });
          navigate('/');
        } else {
          setMessage("");
          setAlertBox({
            isOpen: true,
            message: "Invalid or incorrect verification code.",
            isError: true
          });
        }
      })
      .catch(err => {
        setMessage("");
        const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Something went wrong.";
        setAlertBox({
          isOpen: true,
          message: errorMessage,
          isError: true
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setCanResend(false);
    setTimer(60); 

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/sign-up-code-resend`, { email: userEmail });
      if (res.data === "success") {
        setMessage("");
        setAlertBox({
          isOpen: true,
          message: "Verification code sent! Check your email.",
          isError: false
        });
      } else {
        setAlertBox({
          isOpen: true,
          message: "An error occurred while sending the code. Please try again.",
          isError: true
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || err.message || "Failed to resend code.";
      setAlertBox({
        isOpen: true,
        message: errorMessage,
        isError: true
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-screen bg-white">
      <div className="flex fixed top-0 justify-between items-center h-[8vh] w-[100vw] bg-black bg-opacity-50 z-[20] px-4 sm:px-8">
        <div className="Logo_ hover:cursor-pointer">
          <img
            src={Logo}
            alt="Logo"
            height={100}
            width={160}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-10 text-center md:text-left my-auto sm:border-none">
        <h1 className="text-3xl md:text-4xl font-bold text-black font-libreCaslon">Verify Your Email</h1>
        <p className="text-gray-600 mt-4 font-poppins">We have sent a verification code to your email. Please enter it below to verify your identity.</p>
        <form className="mt-6 flex flex-col items-center md:items-start" onSubmit={e => handleVerify(e)}>
          <input
            type="text"
            placeholder="Enter Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full font-agdasima tracking-widest md:w-80 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="mt-3 px-6 py-3 tracking-wide bg-blue-600 font-agdasima text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
          {message && <p className="mt-3 text-gray-800 font-semibold font-agdasima">{message}</p>}
          <p className="mt-3 text-gray-600 tracking-wide font-agdasima">Resend code in <span className=" text-blue-700">{timer} seconds</span></p>
          <button
            onClick={e => handleResend(e)}
            disabled={!canResend}
            className={`mt-2 px-6 py-2 font-agdasima tracking-wide font-semibold rounded-md shadow-md ${canResend ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          >
            Resend Code
          </button>
        </form>
      </div>

      <div className="hidden md:flex h-screen w-1/2 justify-center items-center p-10 bg-blue-500 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Newsletter preview"
          className="max-w-xs md:max-w-xl shadow-lg rounded-lg transform rotate-6"
        />
      </div>
    </div>
  );
};

export default Confirmation;