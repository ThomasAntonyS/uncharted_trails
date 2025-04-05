import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../Context/UserContextProvider";
import axios from "axios";

const BookingForm = () => {
  const {
    formOpen,
    setFormOpen,
    selectedBooking,
    setSelectedBooking,
    booking,
    setBooking,
  } = useContext(UserContext);

  const [formData, setFormData] = useState({
    destination: "",
    fullName: "",
    email: "",
    phone: "",
    travelers: 1,
    startDate: "",
    endDate: "",
    specialRequests: "",
    price: "",
    bookingData: new Date().toUTCString(),
  });

  useEffect(() => {
    if (selectedBooking) {
      setFormData((prev) => ({
        ...prev,
        destination: selectedBooking.location,
        price: selectedBooking.price,
      }));
    }
  }, [selectedBooking]);

  if (!formOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = sessionStorage.getItem("userEmail");
    if (!userEmail) {
      alert("User not logged in. Please sign in first.");
      return;
    }

    const newBooking = {
      ...formData,
      email: userEmail,
    };

    const alreadyBooked = booking.some(
      (b) => b.destination === selectedBooking.location
    );

    if (alreadyBooked) {
      alert(`You've already booked ${selectedBooking.location}.`);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/booking", newBooking);

      if (response.status === 201) {
        setBooking((prev) => [...prev, newBooking]);
        alert(`Booking confirmed for ${selectedBooking.location}!`);
        setFormOpen(false);
        setSelectedBooking(null);
      } else {
        alert("Booking failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col bg-white rounded-lg p-6 w-[90%] sm:w-[50%] lg:w-[30%] shadow-lg max-h-[95%] overflow-y-auto">
        <button className="flex justify-end my-2" onClick={() => setFormOpen(false)}>
          <IoClose size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-libreCaslon">
          Book Your Trip to {selectedBooking?.location}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-poppins">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Email</label>
            <input
              type="email"
              name="email"
              value={sessionStorage.getItem("userEmail") || ""}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">No. of Travelers</label>
            <input
              type="number"
              name="travelers"
              min="1"
              value={formData.travelers}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Preferred Travel Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Preferred Travel End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 font-agdasima tracking-wider text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Confirm Booking
          </button>
          <button
            type="button"
            onClick={() => {
              setFormOpen(false);
              setSelectedBooking(null);
            }}
            className="bg-red-500 font-agdasima tracking-wider text-white mx-2 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
