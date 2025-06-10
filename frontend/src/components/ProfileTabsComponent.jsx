import React, { useContext, useEffect, useState } from "react";
import { MdFlight, MdLocationOn, MdPublic, MdApartment } from "react-icons/md";
import { UserContext } from "../Context/UserContextProvider";
import { IoMdClose } from "react-icons/io";
import PlusFade from '../assets/icons'
import { Link } from "react-router-dom";
import BookingForm from "./BookingForm";
import { destinations } from '../data/data'
import axios from 'axios'
import ConfirmDeletePopup from './ConfirmDeletePopup';

export const PersonalInfo = ({ userData }) => {

  const [travelData, setTravelData] = useState({
    miles: 0,
    cities: 0,
    world: 0,
    countries: 0,
  });

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard icon={<MdFlight size={32} className=" text-orange-500" />} value={travelData.miles} label="MILES" />
        <InfoCard icon={<MdApartment size={32} className="text-orange-500" />} value={travelData.cities} label="CITIES" />
        <InfoCard icon={<MdPublic size={32} className="text-orange-500" />} value={travelData.world + "%"} label="WORLD" />
        <InfoCard icon={<MdLocationOn size={32} className="text-orange-500" />} value={travelData.countries} label="COUNTRIES" />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <p className=" text-2xl font-bold font-libreCaslon">User Details</p>
        <UserInfo label="NAME:" value={userData.username || "N/A"} />
        <UserInfo label="E-MAIL:" value={userData.email_id || "N/A"} />
        <UserInfo label="PHONE NUMBER:" value={userData.phone_number || "N/A"} />
        <UserInfo label="HOME AIRPORT:" value={userData.home_airport || "N/A"} />
        <UserInfo label="STREET ADDRESS:" value={userData.street_address || "N/A"} />
        <UserInfo label="CITY:" value={userData.city || "N/A"} />
        <UserInfo label="STATE/PROVINCE/REGION:" value={userData.region || "N/A"} />
        <UserInfo label="POSTAL CODE:" value={userData.postal_code || "N/A"} />
        <UserInfo label="COUNTRY:" value={userData.country || "N/A"} />
      </div>
    </>
  )
}

export const UserBooking = () => {
  const { booking, setBooking, setAlertBox } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteName, setDeleteName] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const email = sessionStorage.getItem("userEmail");
      if (!email) return;

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-bookings/${email}`);
        const bookingData = response.data;

        const matchedBookings = bookingData
          .map((bookingItem) => { // Renamed 'booking' to 'bookingItem' to avoid conflict with 'booking' state
            const matchedDestination = destinations.find(
              (place) => place.location === bookingItem.location
            );
            if (matchedDestination) {
              return {
                ...matchedDestination,
                bookingDetails: bookingItem,
              };
            }
            return null;
          })
          .filter((item) => item !== null);

        setBooking(matchedBookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setAlertBox({
          isOpen: true,
          message: "Failed to fetch bookings. Please try again later.",
          isError: true,
        });
      }
    };
    fetchBookings();
  }, [setBooking, setAlertBox]);

  const openCancelPopup = (e, index, id, name) => {
    e.preventDefault()
    setDeleteIndex(index);
    setDeleteId(id);
    setDeleteName(name);
    setPopupOpen(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const email = sessionStorage.getItem("userEmail");
      if (!email) return;

      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/delete-booking/${deleteId}&email_id=${email}`);
      const updatedBookings = booking.filter((_, i) => i !== deleteIndex);
      setBooking(updatedBookings);
      setPopupOpen(false);
      setAlertBox({
        isOpen: true,
        message: "Booking cancelled successfully!",
        isError: false,
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setPopupOpen(false);
      setAlertBox({
        isOpen: true,
        message: "Failed to cancel booking. Please try again.",
        isError: true,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg sm:shadow-md sm:p-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 font-libreCaslon">Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {booking.filter((b) => b.bookingDetails?.status !== "Completed").length > 0 ? (
          booking
            .filter((destination) => destination.bookingDetails?.status !== "Completed")
            .map((destination, index) => (
              <div
                key={destination.bookingDetails?.booking_id || index}
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
                  <p className="text-sm text-gray-600 my-3 font-poppins line-clamp-3">
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center mt-4 font-agdasima">
                    <span className="text-lg font-bold text-indigo-600">
                      {destination.price || "N/A"}
                    </span>
                    <button
                      onClick={(e) =>
                        openCancelPopup(e, index, destination.bookingDetails?.booking_id, destination.location)
                      }
                      className="flex px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 tracking-wider"
                    >
                      <span className="h-max my-auto mr-2">
                        <IoMdClose />
                      </span>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <Link
            to="/pricing"
            className="bg-white border-2 border-dashed transform transition duration-300 p-6 flex flex-col items-center justify-center"
          >
            <div className="w-fit mx-auto">
              <PlusFade />
            </div>
            <p className="text-gray-600 text-center mt-4 font-poppins">
              Book your destination.
            </p>
          </Link>
        )}
      </div>

      <ConfirmDeletePopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleConfirmCancel}
        destinationName={deleteName}
      />
    </div>
  );
};

export const BookingHistory = () => {
  const { booking, setBooking, setAlertBox } = useContext(UserContext);

  const userEmail = sessionStorage.getItem("userEmail");
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-bookings/${userEmail}`)
        setBooking(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setAlertBox({
          isOpen: true,
          message: "Failed to load booking history. Please try again.",
          isError: true,
        });
      }
    };

    if (userEmail) {
      fetchBookings();
    }
  }, [userEmail, setBooking, setAlertBox]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 font-libreCaslon">Booking History</h2>

      {booking.length === 0 ? (
        <p className="text-center text-gray-500 text-[1.3rem] font-agdasima">No bookings found.</p>
      ) : (
        <table className="w-max sm:w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-left text-white text-sm uppercase font-agdasima tracking-wide">
              <th className="p-3">Location</th>
              <th className="p-3">Order Date</th>
              <th className="p-3">No. of Persons</th>
              <th className="p-3">Dates of Your Stay</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((bookingItem, index) => (
              <tr key={index} className="border-b font-poppins hover:bg-gray-50 text-gray-700">
                <td className="p-3">{bookingItem.location}</td>
                <td className="p-3">{bookingItem.orderDate}</td>
                <td className="p-3">{bookingItem.travellers}</td>
                <td className="p-3">{bookingItem.stayDates}</td>
                <td className="p-3">{bookingItem.cost}</td>
                <td
                  className={`p-3 font-semibold ${
                    bookingItem.status === "Completed"
                      ? "text-green-500"
                      : bookingItem.status === "In Progress"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {bookingItem.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const Wishlist = () => {
  const { setFormOpen, wishList, setWishList, setSelectedBooking, loggedIn, setAlertBox } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteName, setDeleteName] = useState('');

  const handleBookNow = (destination) => {
    if (loggedIn) {
      setSelectedBooking(destination);
      setFormOpen(true);
    }
    else setAlertBox({
      isOpen: true,
      message: "You need to log in first to book.",
      isError: true,
    });
  };

  const handleRemoveClick = (index, name) => {
    setDeleteIndex(index);
    setDeleteName(name);
    setPopupOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedList = wishList.filter((_, i) => i !== deleteIndex);
    setWishList(updatedList);
    setPopupOpen(false);
    setAlertBox({
      isOpen: true,
      message: `${deleteName} removed from wishlist.`,
      isError: false,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 font-libreCaslon">Wishlist</h2>
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
        {wishList.length > 0 ? (
          wishList.map((destination, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300"
            >
              <img
                src={destination.image || destination.imageUrl}
                alt={destination.location}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 font-agdasima">
                  {destination.location}
                </h3>
                <p className="text-sm text-gray-600 my-3 font-poppins line-clamp-3">{destination.description}</p>
                <div className="flex justify-between align-middle mt-4 font-agdasima flex-col">
                  <span className="text-lg font-bold text-indigo-600 h-max my-auto">
                    {destination.price}
                  </span>
                  <div className="flex w-max space-x-3 sm:mt-3">
                    <button
                      className="flex px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 tracking-wider"
                      onClick={() => handleBookNow(destination)}
                    >
                      Book Now
                    </button>
                    <button
                      className="flex px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 tracking-wider"
                      onClick={() => handleRemoveClick(index, destination.location)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Link
            to="/explore"
            className="bg-white border-2 border-dashed transform transition duration-300 p-6 flex flex-col items-center justify-center"
          >
            <div className="w-fit mx-auto">
              <PlusFade />
            </div>
            <p className="text-gray-600 text-center mt-4 font-poppins">
              Add your want-to-go destination.
            </p>
          </Link>
        )}
      </div>

      <ConfirmDeletePopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleConfirmDelete}
        destinationName={deleteName}
      />

      <BookingForm />
    </div>
  );
};


export const InformationUpdate = ({ userData, setUserData }) => {
  const [stateChange, setStateChange] = useState(false)
  const { setAlertBox } = useContext(UserContext); 

  const handleChange = (e) => {
    setStateChange(true)
    const updatedData = { ...userData, [e.target.name]: e.target.value };
    setUserData(updatedData);
    sessionStorage.setItem("userData", JSON.stringify(updatedData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stateChange) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/update-user`, userData);
        setAlertBox({
          isOpen: true,
          message: response.data.message,
          isError: false
        });
        setStateChange(false)
        sessionStorage.setItem("userData", JSON.stringify(userData));
        window.location.reload() 
      }
      catch (error) {
        console.error("Error updating user data:", error);
        setAlertBox({
          isOpen: true,
          message: error.response?.data?.message || "Failed to update information.",
          isError: true
        });
      }
    }
    else {
      setAlertBox({
        isOpen: true,
        message: "No data changed to update.",
        isError: true
      });
    }
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