import React, { useEffect, useState } from "react";
import { FaUser, FaHistory, FaHeart, FaWrench, FaNewspaper } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageOptionsModal from '../components/ImageOptionsModal';
import ImageUploadPopup from '../components/ImageUploadPopup';
import { PersonalInfo, UserBooking, BookingHistory, Wishlist, InformationUpdate } from "../components/ProfileTabsComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ icon, text, active, onClick }) => (
    <div
        className={`flex items-center space-x-2 my-4 p-3 rounded-md cursor-pointer font-libreCaslon font-semibold tracking-wide ${active ? "bg-blue-400 text-white transition duration-300" : "border-b-2 rounded-none"}`}
        onClick={onClick}
    >
        {icon}
        <span>{text}</span>
    </div>
);

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("Personal Info");
    const [userData, setUserData] = useState({});
    const [showImageOptionsModal, setShowImageOptionsModal] = useState(false);
    const [showImageUploadModal, setShowImageUploadModal] = useState(false);
    const [profileImagePath, setProfileImagePath] = useState('');
    const navigate = useNavigate();
    const userEmail = sessionStorage.getItem("userEmail");
    const token = sessionStorage.getItem('authToken');

    document.title = "Uncharted Trails | Profile";

    const fetchUserData = () => {
        if (token && userEmail) {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/${userEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setUserData(response.data);
                sessionStorage.setItem("userData", JSON.stringify(response.data));
            })
            .catch((error) => console.error("Error fetching user data:", error));
        }
    };

    const fetchProfileImage = () => {
        if (token && userEmail) {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-image/${userEmail}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setProfileImagePath(response.data.imagePath);
            })
            .catch((error) => {
                console.error("Error fetching profile image path:", error);
                setProfileImagePath('default.jpg');
            });
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchProfileImage();
    }, [userEmail, token]);

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userEmail');
        setTimeout(() => {
            window.location.reload(true);
            navigate("/");
        }, 500);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleImageClick = () => {
        setShowImageOptionsModal(true);
    };

    const handleViewImage = () => {
        window.open(`${import.meta.env.VITE_API_BASE_URL}/api/get-image/${profileImagePath}`, '_blank');
        setShowImageOptionsModal(false);
    };

    const handleEditImage = () => {
        setShowImageOptionsModal(false);
        setShowImageUploadModal(true);
    };

    const handleCloseAllModals = () => {
        setShowImageOptionsModal(false);
        setShowImageUploadModal(false);
    };

    const handleUploadSuccess = () => {
        handleCloseAllModals();
        fetchUserData();
        fetchProfileImage();
    };

    const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s";

    return (
        <>
            <Navbar />

            <div className="flex flex-col p-5 mt-[10vh] md:flex-row sm:py-5 sm:px-10 h-max">
                <div className="w-full h-full md:w-1/4 bg-white shadow-md rounded-lg p-4 md:p-6">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24">
                            <img
                                src={profileImagePath ? `${import.meta.env.VITE_API_BASE_URL}/api/get-image/${profileImagePath}` : defaultImage}
                                alt="User"
                                onError={(e) => { e.target.onerror = null; e.target.src = defaultImage }}
                                className="w-24 h-24 rounded-full cursor-pointer object-cover"
                                onClick={handleImageClick}
                            />
                        </div>
                        <h2 className="text-lg font-semibold mt-2 font-libreCaslon">{userData.username || "N/A"}</h2>
                        <p className="text-sm text-gray-500 font-poppins">MEMBER SINCE {userData.created_at ? new Date(userData.created_at).toLocaleDateString() : "N/A"}</p>
                    </div>

                    <div className="mt-6" >
                        <SidebarItem icon={<FaUser />} text="Personal Info" active={activeTab === "Personal Info"} onClick={() => setActiveTab("Personal Info")} />
                        <SidebarItem icon={<FaNewspaper />} text="Booking" active={activeTab === "Booking"} onClick={() => setActiveTab("Booking")} />
                        <SidebarItem icon={<FaHistory />} text="Booking History" active={activeTab === "Booking History"} onClick={() => setActiveTab("Booking History")} />
                        <SidebarItem icon={<FaHeart />} text="Wishlist" active={activeTab === "Wishlist"} onClick={() => setActiveTab("Wishlist")} />
                        <SidebarItem icon={<FaWrench />} text="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
                        <button className="flex w-full p-2 bg-black text-white justify-center my-4 font-agdasima tracking-wide"
                            onClick={handleLogout}
                        >Log Out <span className=" my-auto m-2"><MdLogout /></span></button>
                    </div>
                </div>

                <div className="flex-1 mt-6 sm:px-4 sm:my-4 md:px-5">
                    {activeTab === "Personal Info" && <PersonalInfo userData={userData} />}
                    {activeTab === "Booking" && <UserBooking />}
                    {activeTab === "Booking History" && <BookingHistory />}
                    {activeTab === "Wishlist" && <Wishlist />}
                    {activeTab === "Settings" && <InformationUpdate userData={userData} setUserData={setUserData} />}
                </div>
            </div>
            
            <ImageOptionsModal
                isOpen={showImageOptionsModal}
                onClose={handleCloseAllModals}
                onView={handleViewImage}
                onEdit={handleEditImage}
            />

            <ImageUploadPopup
                isOpen={showImageUploadModal}
                onClose={handleCloseAllModals}
                onUploadSuccess={handleUploadSuccess}
                userEmail={userEmail}
                token={token}
            />

            <Footer />
        </>
    );
};

export default UserProfile;