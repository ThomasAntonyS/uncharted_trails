import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { IoBookmark } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";

const destinations = [
  {
    name: "Paris, France",
    description: "Experience the City of Light with its iconic Eiffel Tower and romantic streets.",
    price: "$1,200",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
  },
  {
    name: "Tokyo, Japan",
    description: "Explore the vibrant culture, amazing food, and bustling streets of Tokyo.",
    price: "$1,500",
    image: "https://images.pexels.com/photos/161309/traditional-and-technology-zojoji-temple-tokyo-culture-161309.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "New York, USA",
    description: "Discover the Big Apple with its skyscrapers, Broadway shows, and famous landmarks.",
    price: "$1,800",
    image: "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg",
  },
  {
    name: "Sydney, Australia",
    description: "Enjoy Sydney's beaches, opera house, and sunny weather.",
    price: "$1,400",
    image: "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg",
  },
  {
    name: "Cairo, Egypt",
    description: "Visit the pyramids of Giza and immerse yourself in ancient history.",
    price: "$1,100",
    image: "https://images.pexels.com/photos/9865385/pexels-photo-9865385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Cape Town, South Africa",
    description: "Witness breathtaking mountains and coastlines in Cape Town.",
    price: "$1,300",
    image: "https://images.pexels.com/photos/213940/pexels-photo-213940.jpeg",
  },
];

const Explore = () => {
  return (
    <>

      <Navbar/>

       <div
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center tracking-wide"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5015300/pexels-photo-5015300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container flex flex-col mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4 font-libreCaslon">
            Explore the World
          </h1>
          <p className="text-lg text-gray-200 mb-6 font-poppins">
            Discover stunning places around the world. Your adventure starts
            here.
          </p>
          <button className="flex mx-auto px-3 py-3 bg-indigo-600 text-white text-lg font-semibold rounded hover:bg-indigo-700 font-agdasima tracking-wider">
            Get Started <MdArrowRightAlt className="my-auto mx-1" size={25} />
          </button>
        </div>
      </div>

      {/* Explore Cards Section */}
      <section className="my-12 flex flex-col">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 font-libreCaslon">
            Explore Destinations
          </h2>
          <p className="text-gray-600 mb-10 font-poppins">
            Discover stunning places around the world. Find your next travel
            adventure.
          </p>
          <div className=" w-[85vw] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 font-agdasima">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-600 my-3 font-poppins">
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center mt-4 font-agdasima">
                    <span className="text-lg font-bold text-indigo-600">
                      {destination.price}
                    </span>
                    <button className=" flex px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 tracking-wider">
                      Book Now <IoBookmark className="my-auto mx-1" size={15}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>
    </>
    
  );
};

export default Explore;
