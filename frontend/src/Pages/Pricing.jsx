import React, { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { UserContext } from "../Context/UserContextProvider";
import BookingForm from "../components/BookingForm";
import { destinations } from '../data/data';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

const Pricing = () => {
  const { setFormOpen, setSelectedBooking, setAlertBox } = useContext(UserContext);
  const [openAccordion, setOpenAccordion] = useState(null);
  const authToken = sessionStorage.getItem("authToken")

  document.title = "Uncharted Trails | Pricing";

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleBookNow = (destination) => {
    if(authToken){
      setSelectedBooking(destination);
      setFormOpen(true);
    }
    else setAlertBox({
      isOpen:true,
      message:"Login to book a destination.",
      isError:true
    })
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
                    className={`flex items-center justify-between p-4 cursor-pointer ${openAccordion === destination.id ? "bg-black text-white transition-all" : "bg-white"}`}
                  >
                    <h3 className="text-lg font-bold font-agdasima">
                      {destination.location}
                    </h3>
                    <span className=" text-2xl">
                      {openAccordion === destination.id ? <FaMinus size={20} /> : <FaPlus size={20} />}
                    </span>
                  </div>
                  {openAccordion === destination.id && (
                    <div className=" font-poppins">
                      <img
                        src={destination.imageUrl}
                        alt={destination.location}
                        loading="lazy"
                        className="w-full h-[35vh] sm:h-[50vh] object-cover mb-4 sm:p-4"
                      />
                      <p className="px-4">
                        <span className=" font-semibold">Price:</span> {destination.price}
                      </p>
                      <p className="px-4">
                        <span className=" font-semibold">Hotels:</span> {destination.hotels}
                      </p>
                      <p className="px-4">
                        <span className=" font-semibold">No. of Persons:</span> {destination.persons}
                      </p>
                      <p className="px-4">
                        <span className=" font-semibold">No. of Days:</span> {destination.days}
                      </p>
                      <p className="px-4">
                        <span className=" font-semibold">Description:</span> {destination.description}
                      </p>
                      <button
                        onClick={() => handleBookNow(destination)}
                        className="flex my-4 mx-4 bg-black/90 hover:bg-black text-white px-4 py-2 rounded "
                      >
                        Book Now <FaChevronRight size={12} className="ml-2 h-max my-auto" />
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