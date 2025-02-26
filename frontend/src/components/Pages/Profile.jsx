import React, { useState } from "react";
import { FaUser, FaHistory, FaHeart, FaWrench,FaNewspaper } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdFlight, MdLocationOn, MdPublic, MdApartment } from "react-icons/md";
import Navbar from '../Navbar'
import Footer from '../Footer'


{/* Main Components */}

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");

  return (
    <>
      <Navbar/>

      <div className="flex flex-col p-5 mt-[10vh] md:flex-row sm:p-5 h-max">
        {/* Sidebar */}
        <div className="w-full h-max md:w-1/4 bg-white shadow-md rounded-lg p-4 md:p-6">
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="User"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            <h2 className="text-lg font-semibold mt-2">John Brown</h2>
            <p className="text-sm text-gray-500">MEMBER SINCE MAY 2012</p>
          </div>

          <div className="mt-6" >
            <SidebarItem icon={<FaUser />} text="Personal Info" active={activeTab === "Personal Info"} onClick={() => setActiveTab("Personal Info")} />
            <SidebarItem icon={<FaNewspaper />} text="Booking" active={activeTab === "Booking"} onClick={() => setActiveTab("Booking")} />
            <SidebarItem icon={<FaHistory />} text="Booking History" active={activeTab === "Booking History"} onClick={() => setActiveTab("Booking History")} />
            <SidebarItem icon={<FaHeart />} text="Wishlist" active={activeTab === "Wishlist"} onClick={() => setActiveTab("Wishlist")} />
            <SidebarItem icon={<FaWrench />} text="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
            <button className="flex w-full p-2 bg-black text-white justify-center my-4">Log Out <span className=" my-auto m-2"><MdLogout/></span> </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 my-4 sm:px-4 sm:my-0 md:px-5">
          {activeTab=="Personal Info" ? <PersonalInfo/>:null}
          {activeTab=="Booking" ? null:null}
          {activeTab=="Booking History" ? <BookingHistory/>:null}
          {activeTab=="Wishlist" ? null:null}
          {activeTab=="Settings" ? <InformationUpdate/>:null}
        </div>

      </div>

      <Footer/>
    </>
  );
};



{/* Sub/ Nester Components */}
const PersonalInfo = () =>{
  return(
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard icon={<MdFlight size={32} className="text-blue-400" />} value="12467" label="MILES" />
        <InfoCard icon={<MdApartment size={32} className="text-blue-400" />} value="12" label="CITIES" />
        <InfoCard icon={<MdPublic size={32} className="text-blue-400" />} value="4%" label="WORLD" />
        <InfoCard icon={<MdLocationOn size={32} className="text-blue-400" />} value="6" label="COUNTRIES" />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <p className=" text-2xl font-bold">User Details</p>
        <UserInfo label="NAME:" value="John Brown" />
        <UserInfo label="E-MAIL:" value="johnbrown@test.mail.com" />
        <UserInfo label="PHONE NUMBER:" value="+0 000-000-000" />
        <UserInfo label="HOME AIRPORT:" value="London Heathrow Airport (LHR)" />
        <UserInfo label="STREET ADDRESS:" value="46 Gray's Inn Rd, London, WC1X 8LP" />
        <UserInfo label="CITY:" value="London" />
        <UserInfo label="STATE/PROVINCE/REGION:" value="London" />
        <UserInfo label="POSTAL CODE:" value="69106" />
        <UserInfo label="COUNTRY:" value="United Kingdom" />
      </div>
    </>
  )
}

const BookingHistory = () => {
  const bookings = [
    { title: "Wellington Hotel", location: "San Francisco", orderDate: "1/01/2014", stayDates: "1/05/2014 - 1/15/2014", cost: "$1280", status: "Completed" },
    { title: "Ruzzini Palace Hotel", location: "Kiev", orderDate: "7/03/2014", stayDates: "9/05/2014 - 15/05/2014", cost: "$7498", status: "Pending" },
    { title: "Foscari Palace", location: "Copenhagen", orderDate: "23/06/2014", stayDates: "14/07/2014 - 28/07/2014", cost: "$890", status: "Completed" },
    { title: "Hilton Hotel", location: "New York", orderDate: "14/09/2014", stayDates: "18/09/2014 - 19/10/2014", cost: "$2453", status: "Cancelled" },
    { title: "Wellington Hotel", location: "San Francisco", orderDate: "08/04/2014", stayDates: "8/08/2014 - 17/09/2014", cost: "$1653", status: "Completed" },
    { title: "Hilton Molino Stucky", location: "Copenhagen", orderDate: "02/09/2014", stayDates: "12/06/2014 - 16/06/2014", cost: "$1280", status: "Completed" },
    { title: "Hilton Hotel", location: "San Francisco", orderDate: "1/01/2014", stayDates: "18/09/2014 - 19/10/2014", cost: "$3615", status: "Pending" },
    { title: "Wellington Hotel", location: "Stockholm", orderDate: "1/01/2014", stayDates: "8/08/2014 - 17/09/2014", cost: "$859", status: "Completed" },
    { title: "Ruzzini Palace Hotel", location: "Kiev", orderDate: "23/06/2014", stayDates: "9/05/2014 - 15/05/2014", cost: "$347", status: "Cancelled" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full overflow-x-auto">
    <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      <table className="w-max sm:w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
            <th className="p-3">Title</th>
            <th className="p-3">Location</th>
            <th className="p-3">Order Date</th>
            <th className="p-3">Dates of Your Stay</th>
            <th className="p-3">Cost</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 text-gray-700">
              <td className="p-3">{booking.title}</td>
              <td className="p-3">{booking.location}</td>
              <td className="p-3">{booking.orderDate}</td>
              <td className="p-3">{booking.stayDates}</td>
              <td className="p-3">{booking.cost}</td>
              <td className={`p-3 font-semibold ${booking.status === "Completed" ? "text-green-500" : booking.status === "Pending" ? "text-yellow-500" : "text-red-500"}`}>
                {booking.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-end mt-4 text-sm text-gray-600">
        <span className="cursor-pointer hover:text-blue-500 mr-4">&laquo; prev</span>
        <span className="cursor-pointer hover:text-blue-500">next &raquo;</span>
      </div>
    </div>
  );
};

const InformationUpdate = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Change Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
          <input type="text" className="w-full p-2 border rounded-md" value="John Brown" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
          <input type="email" className="w-full p-2 border rounded-md" value="johnbrown@test.mail.com" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Phone Number</label>
          <input type="text" className="w-full p-2 border rounded-md" value="+0 000-000-000" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Home Airport</label>
          <input type="text" className="w-full p-2 border rounded-md" value="London Heathrow Airport (LHR)" readOnly />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-semibold mb-1">Street Address</label>
          <input type="text" className="w-full p-2 border rounded-md" value="46 Gray's Inn Rd, London, WC1X 8LP" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">City</label>
          <input type="text" className="w-full p-2 border rounded-md" value="London" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Postal Code</label>
          <input type="text" className="w-full p-2 border rounded-md" value="69106" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">State/Province/Region</label>
          <input type="text" className="w-full p-2 border rounded-md" value="London" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Country</label>
          <input type="text" className="w-full p-2 border rounded-md" value="United Kingdom" readOnly />
        </div>
      </div>

      <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
        SAVE CHANGES
      </button>
    </div>
  );
};




{/* Micro Components */}

const SidebarItem = ({ icon, text, active, onClick }) => (
  <div 
    className={`flex items-center space-x-2 my-4 p-3 rounded-md cursor-pointer ${active ? "bg-blue-400 text-white transition duration-300" : "border-b-2 rounded-none"}`}
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </div>
);

const InfoCard = ({ icon, value, label }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
    {icon}
    <h3 className="text-xl font-semibold mt-2">{value}</h3>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

const UserInfo = ({ label, value }) => (
  <div className="flex flex-col md:flex-row md:justify-between border-b py-2">
    <span className="font-semibold text-gray-600">{label}</span>
    <span className="text-gray-700">{value}</span>
  </div>
);

export default UserProfile;