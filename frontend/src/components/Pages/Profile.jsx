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

      <div className="flex flex-col p-5 mt-[10vh] md:flex-row sm:py-5 sm:px-10 h-max">
        {/* Sidebar */}
        <div className="w-full h-max md:w-1/4 bg-white shadow-md rounded-lg p-4 md:p-6">
          <div className="flex flex-col items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s"
              alt="User"
              className="w-24 h-24 rounded-full"
            />
            <h2 className="text-lg font-semibold mt-2 font-libreCaslon">John Brown</h2>
            <p className="text-sm text-gray-500 font-poppins">MEMBER SINCE MAY 2012</p>
          </div>

          <div className="mt-6" >
            <SidebarItem icon={<FaUser />} text="Personal Info" active={activeTab === "Personal Info"} onClick={() => setActiveTab("Personal Info")} />
            <SidebarItem icon={<FaNewspaper />} text="Booking" active={activeTab === "Booking"} onClick={() => setActiveTab("Booking")} />
            <SidebarItem icon={<FaHistory />} text="Booking History" active={activeTab === "Booking History"} onClick={() => setActiveTab("Booking History")} />
            <SidebarItem icon={<FaHeart />} text="Wishlist" active={activeTab === "Wishlist"} onClick={() => setActiveTab("Wishlist")} />
            <SidebarItem icon={<FaWrench />} text="Settings" active={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
            <button className="flex w-full p-2 bg-black text-white justify-center my-4 font-agdasima tracking-wide">Log Out <span className=" my-auto m-2"><MdLogout/></span> </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 my-4 sm:px-4 sm:my-4 md:px-5">
          {activeTab=="Personal Info" ? <PersonalInfo/>:null}
          {activeTab=="Booking" ? <UserBooking/>:null}
          {activeTab=="Booking History" ? <BookingHistory/>:null}
          {activeTab=="Wishlist" ? <Wishlist/>:null}
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
        <InfoCard icon={<MdFlight size={32} className=" text-orange-500" />} value="12467" label="MILES" />
        <InfoCard icon={<MdApartment size={32} className="text-orange-500" />} value="12" label="CITIES" />
        <InfoCard icon={<MdPublic size={32} className="text-orange-500" />} value="4%" label="WORLD" />
        <InfoCard icon={<MdLocationOn size={32} className="text-orange-500" />} value="6" label="COUNTRIES" />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <p className=" text-2xl font-bold font-libreCaslon">User Details</p>
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

const UserBooking = () => {
  const bookingData = [
    {
      name: "Cape Town, South Africa",
      description: "Witness breathtaking mountains and coastlines in Cape Town.",
      price: "$1,300",
      image: "https://images.pexels.com/photos/213940/pexels-photo-213940.jpeg",
    },
    {
      name: "Cape Town, South Africa",
      description: "Witness breathtaking mountains and coastlines in Cape Town.",
      price: "$1,300",
      image: "https://images.pexels.com/photos/213940/pexels-photo-213940.jpeg",
    },
    {
      name: "Cape Town, South Africa",
      description: "Witness breathtaking mountains and coastlines in Cape Town.",
      price: "$1,300",
      image: "https://images.pexels.com/photos/213940/pexels-photo-213940.jpeg",
    }
];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 font-libreCaslon">Bookings</h2>
      <div className="w-auto mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {bookingData.map((destination, index) => (
          <div key={index} className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300">
            <img src={destination.image} alt={destination.name} className="w-full h-56 object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 font-agdasima">{destination.name}</h3>
              <p className="text-sm text-gray-600 my-3 font-poppins">{destination.description}</p>
              <div className="flex justify-between items-center mt-4 font-agdasima">
                <span className="text-lg font-bold text-indigo-600">{destination.price}</span>
                <button className="flex px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 tracking-wider">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BookingHistory = () => {
  const bookings = [
    { title: "Wellington Hotel", location: "San Francisco", orderDate: "1/01/2014", stayDates: "1/05/2014 - 1/15/2014", cost: "$1280", status: "Completed" },
    { title: "Ruzzini Palace Hotel", location: "Kiev", orderDate: "7/03/2014", stayDates: "9/05/2014 - 15/05/2014", cost: "$7498", status: "In Progress" },
    { title: "Foscari Palace", location: "Copenhagen", orderDate: "23/06/2014", stayDates: "14/07/2014 - 28/07/2014", cost: "$890", status: "Completed" },
    { title: "Hilton Hotel", location: "New York", orderDate: "14/09/2014", stayDates: "18/09/2014 - 19/10/2014", cost: "$2453", status: "Cancelled" },
    { title: "Wellington Hotel", location: "San Francisco", orderDate: "08/04/2014", stayDates: "8/08/2014 - 17/09/2014", cost: "$1653", status: "Completed" },
    { title: "Hilton Molino Stucky", location: "Copenhagen", orderDate: "02/09/2014", stayDates: "12/06/2014 - 16/06/2014", cost: "$1280", status: "Completed" },
    { title: "Hilton Hotel", location: "San Francisco", orderDate: "1/01/2014", stayDates: "18/09/2014 - 19/10/2014", cost: "$3615", status: "In Progress" },
    { title: "Wellington Hotel", location: "Stockholm", orderDate: "1/01/2014", stayDates: "8/08/2014 - 17/09/2014", cost: "$859", status: "Completed" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full overflow-x-auto">
    <h2 className="text-2xl font-bold mb-4 font-libreCaslon">Booking History</h2>
      <table className="w-max sm:w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-left text-white text-sm uppercase font-agdasima tracking-wide">
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
            <tr key={index} className="border-b font-poppins hover:bg-gray-50 text-gray-700">
              <td className="p-3">{booking.title}</td>
              <td className="p-3">{booking.location}</td>
              <td className="p-3">{booking.orderDate}</td>
              <td className="p-3">{booking.stayDates}</td>
              <td className="p-3">{booking.cost}</td>
              <td className={`p-3 font-semibold ${booking.status === "Completed" ? "text-green-500" : booking.status === "In Progress" ? "text-yellow-500" : "text-red-500"}`}>
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

const Wishlist = () => {
  const wishlistData = [
    {
      name: "Paris, France",
      description: "Experience the City of Light with its iconic Eiffel Tower and romantic streets.",
      price: "$1,200",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
    },
    {
      name: "Paris, France",
      description: "Experience the City of Light with its iconic Eiffel Tower and romantic streets.",
      price: "$1,200",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
    },
    {
      name: "Paris, France",
      description: "Experience the City of Light with its iconic Eiffel Tower and romantic streets.",
      price: "$1,200",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
    }
];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 font-libreCaslon">Wishlist</h2>
      <div className="w-auto mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {wishlistData.map((destination, index) => (
          <div key={index} className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300">
            <img src={destination.image} alt={destination.name} className="w-full h-56 object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 font-agdasima">{destination.name}</h3>
              <p className="text-sm text-gray-600 my-3 font-poppins">{destination.description}</p>
              <div className="flex justify-between items-center mt-4 font-agdasima">
                <span className="text-lg font-bold text-indigo-600">{destination.price}</span>
                <button className="flex px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 tracking-wider">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InformationUpdate = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-libreCaslon">Change Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">Name</label>
          <input type="text" className="w-full p-2 border rounded-md font-poppins" value="John Brown" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">Email</label>
          <input type="email" className="w-full p-2 border rounded-md font-poppins" value="johnbrown@test.mail.com" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">Phone Number</label>
          <input type="text" className="w-full p-2 border rounded-md font-poppins" value="+0 000-000-000" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">Home Airport</label>
          <input type="text" className="w-full p-2 border rounded-md font-poppins" value="London Heathrow Airport (LHR)" readOnly />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">Street Address</label>
          <input type="text" className="w-full p-2 border rounded-md font-poppins" value="46 Gray's Inn Rd, London, WC1X 8LP" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">City</label>
          <input type="text" className="w-full p-2 border rounded-md font-poppins" value="London" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">Postal Code</label>
          <input type="text" className="w-full p-2 border rounded-md font-poppins" value="69106" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">State/Province/Region</label>
          <input type="text" className="w-full p-2 border rounded-md font-poppins" value="London" readOnly />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">Country</label>
          <input type="text" className="w-full p-2 border rounded-md font-poppins" value="United Kingdom" readOnly />
        </div>
      </div>

      <button className="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-black transition font-agdasima tracking-wide">
        SAVE CHANGES
      </button>
    </div>
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

const InfoCard = ({ icon, value, label }) => (
  <div className="bg-gray-800 shadow-md rounded-lg p-4 flex flex-col items-center text-center">
    {icon}
    <h3 className="text-xl text-white font-semibold mt-2 font-agdasima">{value}</h3>
    <p className="text-sm text-gray-200 font-poppins">{label}</p>
  </div>
);

const UserInfo = ({ label, value }) => (
  <div className="flex flex-col md:flex-row md:justify-between border-b py-2">
    <span className="font-semibold text-gray-800 font-agdasima tracking-wide">{label}</span>
    <span className="text-gray-700 font-poppins">{value}</span>
  </div>
);

export default UserProfile;