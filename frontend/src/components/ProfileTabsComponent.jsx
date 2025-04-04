import React, { useContext, useEffect, useState } from "react";
import { MdFlight, MdLocationOn, MdPublic, MdApartment } from "react-icons/md";
import { UserContext } from "../Context/UserContextProvider";
import { IoMdClose } from "react-icons/io";
import PlusFade from '../assets/icons'
import { Link } from "react-router-dom";
import BookingForm from "./BookingForm";
import axios from 'axios'

  export const PersonalInfo = ({userData}) =>{
  
    const [travelData, setTravelData] = useState({
      miles: 0,
      cities: 0,
      world: 0,
      countries: 0,
    });
    
    useEffect(() => {
      fetchTravelData();
    }, []);
    
    const fetchTravelData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/travel-data");
        if (res.data) {
          setTravelData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
  
    return(
      <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoCard icon={<MdFlight size={32} className=" text-orange-500" />} value={travelData.miles} label="MILES" />
          <InfoCard icon={<MdApartment size={32} className="text-orange-500" />} value={travelData.cities} label="CITIES" />
          <InfoCard icon={<MdPublic size={32} className="text-orange-500" />} value={travelData.world+"%"} label="WORLD" />
          <InfoCard icon={<MdLocationOn size={32} className="text-orange-500" />} value={travelData.countries} label="COUNTRIES" />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <p className=" text-2xl font-bold font-libreCaslon">User Details</p>
          <UserInfo label="NAME:" value={userData.username} />
          <UserInfo label="E-MAIL:" value={userData.email_id} />
          <UserInfo label="PHONE NUMBER:" value={userData.phone_number} />
          <UserInfo label="HOME AIRPORT:" value={userData.home_airport} />
          <UserInfo label="STREET ADDRESS:" value={userData.street_address} />
          <UserInfo label="CITY:" value={userData.city} />
          <UserInfo label="STATE/PROVINCE/REGION:" value={userData.region} />
          <UserInfo label="POSTAL CODE:" value={userData.postal_code} />
          <UserInfo label="COUNTRY:" value={userData.country} />
        </div>
      </>
    )
  }
  
  export const UserBooking = () => {
    const { booking, setBooking } = useContext(UserContext);
  
    const handleCancelBooking = (index) => {
      const updatedBookings = booking.filter((_, i) => i !== index);
      setBooking(updatedBookings);
    };
  
    return (
      <div className="bg-white rounded-lg sm:shadow-md sm:p-6 w-full overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 font-libreCaslon">Bookings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          { booking.length>0 ?
            booking.map((destination, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300"
              >
                <img
                  src={destination.imageUrl}
                  alt={destination.location}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 font-agdasima">
                    {destination.location}
                  </h3>
                  <p className="text-sm text-gray-600 my-3 font-poppins">
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center mt-4 font-agdasima">
                    <span className="text-lg font-bold text-indigo-600">
                      {destination.price}
                    </span>
                    <button
                      onClick={() => handleCancelBooking(index)}
                      className="flex px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 tracking-wider"
                    >
                      <span className=" h-max my-auto mr-2"><IoMdClose/></span>Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
            :
            (
            <Link to="/pricing" className="bg-white border-2 border-dashed transform transition duration-300 p-6 flex flex-col items-center justify-center">
              <div className="w-fit mx-auto">
                <PlusFade />
              </div>
              <p className="text-gray-600 text-center mt-4 font-poppins">
                Book your destination.
              </p>
            </Link>
            )
          }
        </div>
      </div>
    );
  };

  export const BookingHistory = () => {
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
  
  export const Wishlist = () => {
    const { setFormOpen, wishList, setWishList, setSelectedBooking} = useContext(UserContext);
  
    const handleBookNow = (destination) => {     
      setSelectedBooking(destination);
      setFormOpen(true);
    };
  
    const handleRemoveWishList = (e, index) => {
      e.preventDefault();
      const updatedList = wishList.filter((_, i) => i !== index);
      setWishList(updatedList);
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 w-full overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 font-libreCaslon">Wishlist</h2>
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {wishList.length > 0 ? (
            wishList.map((destination, index) => (
              <div key={index} className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300">
                <img src={destination.image || destination.imageUrl} alt={destination.location} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 font-agdasima">{destination.location}</h3>
                  <p className="text-sm text-gray-600 my-3 font-poppins">{destination.description}</p>
                  <div className="flex justify-between align-middle mt-4 font-agdasima flex-col xl:flex-row">
                    <span className="text-lg font-bold text-indigo-600 h-max my-auto">{destination.price}</span>
                    <div className="flex w-max space-x-3 sm:mt-3 xl:mt-0">
                      <button
                        className="flex px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 tracking-wider"
                        onClick={() => handleBookNow(destination)}
                      >
                        Book Now
                      </button>
                      <button
                        className="flex px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 tracking-wider"
                        onClick={(e) => handleRemoveWishList(e, index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Link to="/explore" className="bg-white border-2 border-dashed transform transition duration-300 p-6 flex flex-col items-center justify-center">
              <div className="w-fit mx-auto">
                <PlusFade />
              </div>
              <p className="text-gray-600 text-center mt-4 font-poppins">
                Add your want-to-go destination.
              </p>
            </Link>
          )}
        </div>
        <BookingForm />
      </div>
    );
  };
  
  export const InformationUpdate = ({userData,setUserData}) => {

    const [stateChange,setStateChange] = useState(false)
  
    const handleChange = (e) => {
      setStateChange(true)
      const updatedData = { ...userData, [e.target.name]: e.target.value };
      setUserData(updatedData);
      sessionStorage.setItem("userData", JSON.stringify(updatedData));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(stateChange){
        try {
          const response = await axios.post("http://localhost:5000/update-user", userData);
          alert(response.data.message);
          setStateChange(false)
          sessionStorage.setItem("userData", JSON.stringify(userData));
        } 
        catch (error) {
          console.error("Error updating user data:", error);
        }
      }
      else
      alert("No data changed to update")
    };
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6 w-full mx-auto">
        <h2 className="text-2xl font-bold font-libreCaslon mb-4">Change Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData && Object.keys(userData).map((key) => (
              key !== "email_id" && key !== "created_at" && key !== "id" ? (
                <div key={key}>
                  <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">
                    {key.replace("_", " ").toUpperCase()}
                  </label>
                  <input
                    type="text"
                    name={key}
                    placeholder={userData[key]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md font-poppins"
                  />
                </div>
              ) : (
                key === "email_id" && (
                  <div key={key}>
                    <label className="block text-gray-700 text-sm font-semibold mb-1 font-agdasima tracking-wide">EMAIL</label>
                    <input
                      type="email"
                      name={key}
                      value={userData[key]}
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-100 font-poppins"
                    />
                  </div>
                )
              )
            ))}
          </div>
          <button type="submit" className="mt-6 w-full bg-black text-white py-2 rounded-md font-agdasima tracking-wide">
            SAVE CHANGES
          </button>
        </form>
      </div>
    );
    
  };

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