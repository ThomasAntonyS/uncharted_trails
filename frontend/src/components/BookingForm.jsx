import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContextProvider";

const BookingForm = () => {
  const { formOpen, setFormOpen, booking } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: 1,
    startDate: "",
    endDate: "",
    specialRequests: "",
  });

  if (!formOpen || !booking) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${booking.name}!`);
    setFormOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[30%] shadow-lg max-h-[95%] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 font-libreCaslon">
          Book Your Trip to {booking.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-poppins">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
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
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Preferred Travel Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-poppins">Preferred Travel End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Confirm Booking
          </button>
        </form>
        <button
          onClick={() => setFormOpen(false)}
          className="mt-4 text-red-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
