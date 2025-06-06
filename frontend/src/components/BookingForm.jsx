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
    userEmail,
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
    bookingDate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedBooking) {
      setFormData((prev) => ({
        ...prev,
        destination: selectedBooking.location,
        price: selectedBooking.price,
        email: userEmail || sessionStorage.getItem("userEmail") || "",
      }));
    }
  }, [selectedBooking, userEmail]);

  if (!formOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (formData.phone.length !== 10) newErrors.phone = "Phone number must be 10 digits.";
    if (formData.travelers < 1) newErrors.travelers = "Number of travelers must be at least 1.";
    if (!formData.startDate) newErrors.startDate = "Preferred Travel Start Date is required.";
    if (!formData.endDate) newErrors.endDate = "Preferred Travel End Date is required.";

    if (formData.startDate) {
      const selectedStartDate = new Date(formData.startDate);
      selectedStartDate.setHours(0, 0, 0, 0);

      if (selectedStartDate <= today) {
        newErrors.startDate = "Travel start date must be a future date.";
      }
    }

    if (formData.endDate && formData.startDate) {
      const selectedStartDate = new Date(formData.startDate);
      const selectedEndDate = new Date(formData.endDate);
      selectedStartDate.setHours(0, 0, 0, 0);
      selectedEndDate.setHours(0, 0, 0, 0);

      if (selectedEndDate <= selectedStartDate) {
        newErrors.endDate = "Travel end date must be after the start date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("User not logged in. Please sign in first.");
      return;
    }

    if (!validateForm()) {
      alert("Please correct the errors in the form.");
      return;
    }

    const currentBookingDate = new Date().toISOString();
    const newBooking = {
      ...formData,
      email: userEmail,
      bookingDate: currentBookingDate,
    };

    const alreadyBooked = booking.some(
      (b) => b.destination === selectedBooking.location && b.email === userEmail
    );

    if (alreadyBooked) {
      alert(`You've already booked ${selectedBooking.location}.`);
      return;
    }

    try {  
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/booking`, newBooking);

      if (response.status === 201) {
        setBooking((prev) => [...prev, response.data]);
        alert(`Booking confirmed for ${selectedBooking.location}!`);
        setFormOpen(false);
        setSelectedBooking(null);
        setFormData({
            destination: "",
            fullName: "",
            email: "",
            phone: "",
            travelers: 1,
            startDate: "",
            endDate: "",
            specialRequests: "",
            price: "",
            bookingDate: "",
        });
        setErrors({});
      } else {
        alert("Booking failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert(
        "An error occurred while booking. Please try again. " +
          (error.response?.data?.message || "")
      );
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
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.fullName ? 'border-red-500' : 'focus:ring-blue-200'}`}
              required
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Email</label>
            <input
              type="email"
              name="email"
              value={userEmail || sessionStorage.getItem("userEmail") || ""}
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
              minLength={10}
              maxLength={10}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.phone ? 'border-red-500' : 'focus:ring-blue-200'}`}
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">No. of Travelers</label>
            <input
              type="number"
              name="travelers"
              min="1"
              max={100}
              value={formData.travelers}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.travelers ? 'border-red-500' : 'focus:ring-blue-200'}`}
              required
            />
            {errors.travelers && <p className="text-red-500 text-sm mt-1">{errors.travelers}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Preferred Travel Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.startDate ? 'border-red-500' : 'focus:ring-blue-200'}`}
              required
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Preferred Travel End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.endDate ? 'border-red-500' : 'focus:ring-blue-200'}`}
              required
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
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
              setFormData({
                destination: "",
                fullName: "",
                email: "",
                phone: "",
                travelers: 1,
                startDate: "",
                endDate: "",
                specialRequests: "",
                price: "",
                bookingDate: "",
              });
              setErrors({});
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