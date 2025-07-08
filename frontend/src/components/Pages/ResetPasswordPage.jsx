import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import Logo from '../../assets/Logo.webp'; 
import { FaHome } from "react-icons/fa";
import { useEffect } from "react";

const ResetPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState( sessionStorage.getItem("step") || "enterEmail");
  const [email, setEmail] = useState( sessionStorage.getItem("email") || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState('password');
  const navigate = useNavigate()

  document.title = "Uncharted Trails | Reset Password";

  useEffect(()=>{
    sessionStorage.setItem("step",currentStep)
    if(email)
      sessionStorage.setItem("email",email)
  },[email,currentStep])

  const handleShowPassword = () => {
    if (showPassword === "text")
      setShowPassword("password");
    else
      setShowPassword("text");
  };

  const handleSendOtp = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!email.trim()) {
      setError("Please enter your email address.");
      setLoading(false); 
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reset-password-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:email }),
      });

      if (response.ok) {
        setSuccessMessage("OTP sent to your email. Please check your inbox.");
        setCurrentStep("verifyOtp");
      } else {
        const errorData = await response.json();
        if(errorData.message === "A password reset code has already been sent to this email. Please check your inbox and try again.")
          setCurrentStep("verifyOtp");
        setError(errorData.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verify-reset-password-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:email, otp:otp }),
      });

      if (response.ok) {
        setSuccessMessage("OTP verified successfully.");
        setCurrentStep("setNewPassword");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!(newPassword.trim() && confirmPassword.trim())) {
      setError("Please enter and confirm your new password.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reset-password`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:email, newPassword:newPassword }),
      });

      if (response.ok) {
        sessionStorage.removeItem("currentStep")
        sessionStorage.removeItem("email")
        setCurrentStep("enterEmail")
        setSuccessMessage("Your password has been successfully reset! Redirecting to login...");
        setTimeout(() => {
          navigate('/log-in')
        }, 3000); 
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex fixed top-0 justify-between items-center h-[8vh] w-[100vw] bg-black bg-opacity-50 z-[20] px-4 sm:px-8">
        <Link to={"/"} className="Logo_">
          <img src={Logo} alt="Logo" height={100} width={160} />
        </Link>
        <div className="flex text-white align-middle sm:text-lg font-libreCaslon font-bold bg-black px-2 py-1 rounded-sm bg-opacity-65">
          <Link to="/" className="flex"><FaHome className="mx-1 my-auto" />Home</Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h1 className="text-3xl font-bold mb-2 font-libreCaslon">Reset Your Password</h1>
        <p className="text-gray-500 mb-6 font-poppins">Follow the steps to regain access</p>

        <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
          {error && <p className="text-red-500 text-center mb-4 text-sm font-poppins">{error}</p>}
          {successMessage && <p className="text-green-500 text-center mb-4 text-sm font-poppins">{successMessage}</p>}

          {currentStep === "enterEmail" && (
            <div className="flex flex-col gap-6">
              <input
                type="email"
                placeholder="Enter your email *"
                className="w-full font-poppins p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <button
                onClick={handleSendOtp}
                className=" flex justify-center w-full font-poppins tracking-wider bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <p>{loading ? "Sending OTP..." : "Send OTP >"}</p>
              </button>
            </div>
          )}

          {currentStep === "verifyOtp" && (
            <div className="flex flex-col gap-6">
              <p className="text-sm text-gray-600 text-center font-poppins">
                An OTP has been sent to **{email}**. Please check your inbox.
              </p>
              <input
                type="text"
                placeholder="Enter OTP *"
                className="w-full font-poppins p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
              />
              <button
                onClick={handleVerifyOtp}
                className=" flex justify-center w-full font-poppins tracking-wider bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <p>{loading ? "Verifying..." : "Verify OTP >"}</p>
              </button>
              <button
                onClick={handleSendOtp}
                className="text-sm text-purple-600 hover:underline mt-2 font-poppins self-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Resend OTP
              </button>
            </div>
          )}

          {currentStep === "setNewPassword" && (
            <div className="flex flex-col gap-6">
              <input
                type={showPassword}
                placeholder="Enter new password *"
                className="w-full font-poppins p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
              <input
                type={showPassword}
                placeholder="Confirm new password *"
                className="w-full font-poppins p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <div className=" flex align-middle w-full mt-1 gap-x-2 font-poppins">
                <input type="checkbox" onChange={handleShowPassword} /> <p>Show password</p>
              </div>
              <button
                onClick={handleResetPassword}
                className="flex justify-center w-full font-poppins tracking-wider bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <p>{loading ? "Resetting..." : "Reset Password >"}</p>
              </button>
            </div>
          )}
        </form>

        <p className="mt-4 text-gray-600 font-poppins">
          Remember your password? <Link to='/log-in' className="text-purple-600 font-poppins tracking-wider underline">Log in</Link>
        </p>
      </div>

      <div className="hidden md:flex w-1/2 bg-purple-200 justify-center items-center">
        <div className="w-full h-full">
          <img src="https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Illustration"
            className="w-full object-cover h-full" />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;