import React, { useContext, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { UserContext } from "../../Context/UserContextProvider";
import BookingForm from "../BookingForm";
import {destinations} from '../../data/data'

const Pricing = () => {
  const { setFormOpen, setSelectedBooking } = useContext(UserContext);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleBookNow = (destination) => {
    setSelectedBooking(destination);
    setFormOpen(true);            
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="">
          <div
            className="relative bg-cover bg-center h-[300px] sm:h-[500px]"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/9589211/pexels-photo-9589211.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load")',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative flex items-center justify-center flex-col max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white h-full">
              <h1 className="text-4xl sm:text-6xl font-libreCaslon font-semibold">
                Explore Our Exclusive Packages
              </h1>
              <p className="text-lg sm:text-xl font-poppins">
                Plan your dream vacation with ease and comfort.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center font-libreCaslon">
              Our Travel Packages
            </h2>
            <p className="text-lg text-gray-600 text-center mt-4 font-poppins">
              Choose from our curated selection of travel packages designed to
              offer the best experiences around the globe. Each package is
              crafted to provide comfort, excitement, and unforgettable
              memories.
            </p>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className="border rounded-lg overflow-hidden shadow-lg"
                >
                  <div
                    onClick={() => toggleAccordion(destination.id)}
                    className="flex items-center justify-between p-4 cursor-pointer bg-white"
                  >
                    <h3 className="text-lg font-bold text-gray-800 font-agdasima">
                      {destination.location}
                    </h3>
                    <span className="text-gray-500 text-2xl">
                      {openAccordion === destination.id ? "-" : "+"}
                    </span>
                  </div>
                  {openAccordion === destination.id && (
                    <div className="p-4 bg-gray-50 font-poppins">
                      <img
                        src={destination.imageUrl}
                        alt={destination.location}
                        className="w-full h-[50vh] object-cover mb-4"
                      />
                      <p>
                        <strong>Price:</strong> {destination.price}
                      </p>
                      <p>
                        <strong>Hotels:</strong> {destination.hotels}
                      </p>
                      <p>
                        <strong>No. of Persons:</strong> {destination.persons}
                      </p>
                      <p>
                        <strong>No. of Days:</strong> {destination.days}
                      </p>
                      <p>
                        <strong>Description:</strong> {destination.description}
                      </p>
                      <button
                        onClick={() => handleBookNow(destination)}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <BookingForm />
      </section>
      <Footer />
    </>
  );
};

export default Pricing;
