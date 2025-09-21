import React, { useContext, useState, useEffect } from "react";
import Logo from "../assets/Logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { UserContext } from "../Context/UserContextProvider";
import axios from "axios";
import ProfiePlaceHolder from "../assets/Profile_Placeholder.jpg";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setAlertBox } = useContext(UserContext);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const navigate = useNavigate();

    const authToken = sessionStorage.getItem("authToken");
    const userEmail = sessionStorage.getItem("userEmail");

    useEffect(() => {
        const storedImageUrl = sessionStorage.getItem("profileImageUrl");

        const fetchProfileImage = () => {
            if (authToken && userEmail) {
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-image/${userEmail}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                })
                .then((response) => {
                    const newImageUrl = response.data.imageUrl;
                    setProfileImageUrl(newImageUrl);
                    sessionStorage.setItem("profileImageUrl", newImageUrl); 
                })
                .catch((error) => {
                    console.error("Error fetching profile image URL:", error);
                    setProfileImageUrl('');
                });
            } else {
                setProfileImageUrl('');
                sessionStorage.removeItem("profileImageUrl");
            }
        };

        if (authToken && storedImageUrl) {
            setProfileImageUrl(storedImageUrl);
        } else {
            fetchProfileImage();
        }
    }, [authToken, userEmail]);

    function handleNavigation(e, navLink) {
        e.preventDefault();
        navigate(navLink);
        setIsMenuOpen(false);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function handleLogout(e) {
        e.preventDefault();
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("profileImageUrl");
        setTimeout(() => {
            window.location.reload(true);
            navigate("/");
        }, 500);
        setAlertBox({
            message: "Logged out successfully.",
            isError: false,
            isOpen: true
        });
    }

    return (
        <div className="flex fixed top-0 justify-between items-center h-[8vh] w-full bg-black bg-opacity-25 z-[20] px-4 sm:px-8 backdrop-blur-sm">
            {/* Logo */}
            <Link onClick={(e) => handleNavigation(e, "/")} className="Logo_">
                <img src={Logo} alt="Logo" height={100} width={160} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-16 font-poppins text-[1rem] sm:text-[1.1rem] text-white">
                <Link onClick={(e) => handleNavigation(e, "/")} className="hover:border-white hover:border-b-[1.5px] transition-all delay-100">Home</Link>
                <Link onClick={(e) => handleNavigation(e, "/explore")} className="hover:border-white hover:border-b-[1.5px] transition-all delay-100">Explore</Link>
                <Link onClick={(e) => handleNavigation(e, "/blog")} className="hover:border-white hover:border-b-[1.5px] transition-all delay-100">Blog</Link>
                <Link onClick={(e) => handleNavigation(e, "/pricing")} className="hover:border-white hover:border-b-[1.5px] transition-all delay-100">Pricing</Link>
            </div>

            {/* Desktop Profile */}
            {authToken ? (
                <div className="hidden h-full xl:flex items-center space-x-6 font-poppins text-[1rem] rounded-full text-white sm:mx-4">
                    <button onClick={(e) => handleLogout(e)} className=" flex border-white border-b-2 transition-all py-1 font-poppins">Logout <span className=" h-max my-auto ml-1"><IoMdLogOut size={20} /></span></button>
                    <Link to="/profile" className="flex items-center justify-center w-10 h-10 sm:bg-black sm:bg-opacity-30 rounded-full" title="Profile">
                        {profileImageUrl ? (
                            <img
                                src={profileImageUrl}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = ProfiePlaceHolder;
                                }}
                            />
                        ) : (
                            <FaUserAlt size={18} />
                        )}
                    </Link>
                </div>
            ) : (
                <div className="hidden xl:flex items-center space-x-4 font-poppins text-[1rem] sm:text-[1.1rem] text-white">
                    <Link onClick={(e) => handleNavigation(e, "/log-in")}>Login</Link>
                    <Link
                        onClick={(e) => handleNavigation(e, "/sign-up")}
                        className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            )}

            {/* Mobile Hamburger Icon */}
            <div className="flex xl:hidden items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white focus:outline-none"
                >
                    {isMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed top-[8vh] left-0 w-full bg-black bg-opacity-90 text-white z-40 xl:hidden">
                    <div className="flex flex-col items-center space-y-4 py-4 font-poppins text-[1.1rem]">
                        <Link onClick={(e) => handleNavigation(e, "/")}>Home</Link>
                        <Link onClick={(e) => handleNavigation(e, "/explore")}>Explore</Link>
                        <Link onClick={(e) => handleNavigation(e, "/blog")}>Blog</Link>
                        <Link onClick={(e) => handleNavigation(e, "/pricing")}>Pricing</Link>

                        {authToken ? (
                            <>
                                <Link onClick={(e) => handleNavigation(e, "/profile")} className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                                        {profileImageUrl ? (
                                            <img
                                                src={profileImageUrl}
                                                alt="Profile"
                                                className="w-full h-full rounded-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = ProfiePlaceHolder;
                                                }}
                                            />
                                        ) : (
                                            <FaUserAlt size={15} />
                                        )}
                                    </div>
                                    <span>Profile</span>
                                </Link>
                                <button onClick={(e) => handleLogout(e)} className="flex items-center space-x-2">
                                    <IoMdLogOut size={15} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center space-y-2 mt-4">
                                <Link onClick={(e) => handleNavigation(e, "/log-in")}>Login</Link>
                                <Link
                                    onClick={(e) => handleNavigation(e, "/sign-up")}
                                    className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;