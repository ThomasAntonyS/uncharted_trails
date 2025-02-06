import React, { useState, useEffect } from "react";
import Logo from '../../assets/Logo.png'

const Confirmation = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = () => {
    if (verificationCode === "123456") {
      setMessage("Verification successful!");
    } else {
      setMessage("Invalid verification code. Please try again.");
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-white">

        <div className="flex fixed top-0 justify-between items-center h-[8vh] w-[100vw] bg-black bg-opacity-50 z-[20] px-4 sm:px-8">

            <div  className="Logo_ hover:cursor-pointer">
              <img
                src={Logo}
                alt="Logo"
                height={100}
                width={160}
              />
            </div>
        </div>

      {/* Left Section - Email Verification */}
      <div className="w-full md:w-1/2 p-10 text-center md:text-left my-auto border sm:border-none">
        <h1 className="text-3xl md:text-4xl font-bold text-black font-libreCaslon">Verify Your Email</h1>
        <p className="text-gray-600 mt-4 font-poppins">We have sent a verification code to your email. Please enter it below to verify your identity.</p>
        <div className="mt-6 flex flex-col items-center md:items-start">
          <input
            type="text"
            placeholder="Enter Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full font-agdasima tracking-widest md:w-80 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleVerify}
            className="mt-3 px-6 py-3 tracking-wide bg-blue-600 font-agdasima text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
          >
            Verify
          </button>
          {message && <p className="mt-3 text-gray-800 font-semibold">{message}</p>}
          <p className="mt-3 text-gray-600 tracking-wide font-agdasima">Resend code in <span className=" text-blue-700">{timer} seconds</span></p>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`mt-2 px-6 py-2 font-agdasima tracking-wide font-semibold rounded-md shadow-md ${canResend ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          >
            Resend Code
          </button>
        </div>
      </div>
      {/* Right Section - Hidden on Small Screens */}
      <div className="hidden md:flex w-1/2 justify-center items-center p-10 bg-blue-500">
        <img
          src="https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Newsletter preview"
          className="max-w-xs md:max-w-md shadow-lg rounded-lg transform rotate-6"
        />
      </div>
    </div>
  );
};

export default Confirmation;
