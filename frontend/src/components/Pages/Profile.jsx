import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaHistory, FaHeart, FaWrench,FaNewspaper } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Navbar from '../Navbar'
import Footer from '../Footer'
import { UserContext } from "../../Context/UserContextProvider";
import { PersonalInfo, UserBooking, BookingHistory, Wishlist, InformationUpdate } from "../ProfileTabsComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [userData, setUserData] = useState({});
  const { userEmail, setLoggedIn, setUserEmail } = useContext(UserContext);
  const navigate = useNavigate()

  document.title = "Uncharted Trails | Profile"

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/user/${userEmail}`)
        .then((response) => {
          setUserData(response.data);
          sessionStorage.setItem("userData", JSON.stringify(response.data));
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userEmail]);

  const handleLogout = ()=>{
    setLoggedIn(false)
    setUserEmail("")
    navigate("/")
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }

  return (
    <>
      <Navbar/>

      <div className="flex flex-col p-5 mt-[10vh] md:flex-row sm:py-5 sm:px-10 h-max">
        {/* Sidebar */}
        <div className="w-full h-full md:w-1/4 bg-white shadow-md rounded-lg p-4 md:p-6">
          <div className="flex flex-col items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s"
              alt="User"
              className="w-24 h-24 rounded-full"
            />
            <h2 className="text-lg font-semibold mt-2 font-libreCaslon">{userData.username || "N/A"}</h2>
            <p className="text-sm text-gray-500 font-poppins">MEMBER SINCE {userData.created_at || "N/A"}</p>
          </div>

          <div className="mt-6" >
            <SidebarItem icon={<FaUser />} text="Personal Info" active={activeTab === "Personal Info"} onClick={() => setActiveTab("Personal Info")} />
            <SidebarItem icon={<FaNewspaper />} text="Booking" active={activeTab === "Booking"} onClick={() => setActiveTab("Booking")} />
            <SidebarItem icon={<FaHistory />} text="Booking History" active={activeTab === "Booking History"} onClick={() => setActiveTab("Booking History")} />
            <SidebarItem icon={<FaHeart />} text="Wishlist" active={activeTab === "Wishlist"} onClick={() => setActiveTab("Wishlist")} />
            <SidebarItem icon={<FaWrench />} text="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
            <button className="flex w-full p-2 bg-black text-white justify-center my-4 font-agdasima tracking-wide"
            onClick={handleLogout}
            >Log Out <span className=" my-auto m-2"><MdLogout/>
            </span> </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 mt-6 sm:px-4 sm:my-4 md:px-5">
          {activeTab=="Personal Info" ? <PersonalInfo userData={userData}/>:null}
          {activeTab=="Booking" ? <UserBooking/>:null}
          {activeTab=="Booking History" ? <BookingHistory/>:null}
          {activeTab=="Wishlist" ? <Wishlist />:null}
          {activeTab=="Settings" ? <InformationUpdate userData={userData} setUserData={setUserData}/>:null}
        </div>

      </div>

      <Footer/>
    </>
  );
};


{/* Micro Components */}

const SidebarItem = ({ icon, text, active, onClick }) => (
  <div 
    className={`flex items-center space-x-2 my-4 p-3 rounded-md cursor-pointer font-libreCaslon font-semibold tracking-wide ${active ? "bg-blue-400 text-white transition duration-300" : "border-b-2 rounded-none"}`}
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </div>
);

export default UserProfile;