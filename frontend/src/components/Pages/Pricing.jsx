import React, { useContext, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { UserContext } from "../../Context/UserContextProvider";
import BookingForm from "../BookingForm";

const Pricing = () => {
  const { setFormOpen } = useContext(UserContext);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [bookingLocation, setBookingLocation] = useState(""); // Added state

  const destinations = [
    {
      id: 1,
      location: "Bali, Indonesia",
      price: "₹1,20,000",
      hotels: "5-star Resort",
      persons: "2 Adults",
      days: "7 Days, 6 Nights",
      description: "Explore the serene beaches and vibrant culture of Bali.",
      imageUrl: "https://images.pexels.com/photos/2474687/pexels-photo-2474687.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      location: "Paris, France",
      price: "₹1,80,000",
      hotels: "Luxury Hotel",
      persons: "2 Adults, 1 Child",
      days: "5 Days, 4 Nights",
      description: "Experience the romantic city of Paris with Eiffel Tower views.",
      imageUrl: "https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      location: "Patagonia, Chile",
      price: "₹2,50,000",
      hotels: "Boutique Lodges",
      persons: "4 Persons",
      days: "10 Days, 9 Nights",
      description: "Adventure through glaciers and mountains in Patagonia.",
      imageUrl: "https://images.pexels.com/photos/27852901/pexels-photo-27852901/free-photo-of-the-mountains-and-water-in-the-background-of-a-landscape.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 4,
      location: "Kyoto, Japan",
      price: "₹1,50,000",
      hotels: "Traditional Ryokan",
      persons: "2 Persons",
      days: "6 Days, 5 Nights",
      description: "Discover ancient temples and stunning cherry blossoms.",
      imageUrl: "https://images.pexels.com/photos/1673978/pexels-photo-1673978.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 5,
      location: "Santorini, Greece",
      price: "₹2,00,000",
      hotels: "Luxury Villa",
      persons: "2 Adults",
      days: "5 Days, 4 Nights",
      description: "Relax on the iconic white beaches of Santorini.",
      imageUrl: "https://images.pexels.com/photos/221532/pexels-photo-221532.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 6,
      location: "Cappadocia, Turkey",
      price: "₹1,30,000",
      hotels: "Cave Hotel",
      persons: "2 Adults",
      days: "4 Days, 3 Nights",
      description: "Experience hot air balloon rides over stunning landscapes.",
      imageUrl: "https://images.pexels.com/photos/13010103/pexels-photo-13010103.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 7,
      location: "Maui, Hawaii",
      price: "₹2,80,000",
      hotels: "Beachfront Resort",
      persons: "2 Adults, 2 Kids",
      days: "7 Days, 6 Nights",
      description: "Enjoy tropical beaches and lush rainforests in Maui.",
      imageUrl: "https://images.pexels.com/photos/19397878/pexels-photo-19397878/free-photo-of-view-of-a-tropical-beach-with-palm-trees.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 8,
      location: "Rome, Italy",
      price: "₹1,70,000",
      hotels: "Historic Hotel",
      persons: "2 Adults",
      days: "5 Days, 4 Nights",
      description: "Explore ancient ruins and savor authentic Italian cuisine.",
      imageUrl: "https://images.pexels.com/photos/29434694/pexels-photo-29434694/free-photo-of-iconic-baroque-architecture-in-rome-s-piazza-navona.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 9,
      location: "Sydney, Australia",
      price: "₹1,40,000",
      hotels: "City Hotel",
      persons: "3 Persons",
      days: "6 Days, 5 Nights",
      description: "Visit the Sydney Opera House and beautiful beaches.",
      imageUrl: "https://images.pexels.com/photos/5707610/pexels-photo-5707610.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 10,
      location: "Reykjavik, Iceland",
      price: "$3,00,000",
      hotels: "Scenic Lodges",
      persons: "4 Persons",
      days: "8 Days, 7 Nights",
      description: "Experience the Northern Lights and unique landscapes.",
      imageUrl: "https://images.pexels.com/photos/7403885/pexels-photo-7403885.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleBookNow = (location) => {
    setBookingLocation(location); // Set the selected location
    setFormOpen(true);
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="py-12">
        <div
           className="relative bg-cover bg-center h-[300px] sm:h-[500px]"
           style={{ backgroundImage: 'url("https://images.pexels.com/photos/9589211/pexels-photo-9589211.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load")' }}
         >
           <div className="absolute inset-0 bg-black bg-opacity-50"></div>
           <div className="relative flex items-center justify-center flex-col max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white h-full">
             <h1 className="text-4xl sm:text-6xl font-libreCaslon font-semibold">Explore Our Exclusive Packages</h1>
             <p className="text-lg sm:text-xl font-poppins">Plan your dream vacation with ease and comfort.</p>
           </div>
         </div>

         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <h2 className="text-3xl font-bold text-gray-800 text-center font-libreCaslon">Our Travel Packages</h2>
           <p className="text-lg text-gray-600 text-center mt-4 font-poppins">
             Choose from our curated selection of travel packages designed to offer the best experiences around the globe. Each package is crafted to provide comfort, excitement, and unforgettable memories.
           </p>
         </div>
         
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {destinations.map((destination) => (
                <div key={destination.id} className="border rounded-lg overflow-hidden shadow-lg">
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
                        onClick={() => handleBookNow(destination.location)}
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
        {/* Pass bookingLocation as a prop */}
        <BookingForm bookingLocation={bookingLocation} />
      </section>
      <Footer />
    </>
  );
};

export default Pricing;
