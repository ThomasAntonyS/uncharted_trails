import React, { useContext, useState } from "react";
import Footer from "../Footer";
import { IoBookmark } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContextProvider";
import FloatingPopup from "../FloatingPopup";

const destinations = [
  {
    name: "Paris, France",
    description: "Experience the City of Light with its iconic Eiffel Tower and romantic streets.",
    price: "₹1,20,000",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
  },
  {
    name: "Tokyo, Japan",
    description: "Explore the vibrant culture, amazing food, and bustling streets of Tokyo.",
    price: "₹1,50,000",
    image: "https://images.pexels.com/photos/161309/traditional-and-technology-zojoji-temple-tokyo-culture-161309.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "New York, USA",
    description: "Discover the Big Apple with its skyscrapers, Broadway shows, and famous landmarks.",
    price: "₹1,80,000",
    image: "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg",
  },
  {
    name: "Sydney, Australia",
    description: "Enjoy Sydney's beaches, opera house, and sunny weather.",
    price: "₹1,40,000",
    image: "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg",
  },
  {
    name: "Cairo, Egypt",
    description: "Visit the pyramids of Giza and immerse yourself in ancient history.",
    price: "₹1,10,000",
    image: "https://images.pexels.com/photos/9865385/pexels-photo-9865385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Cape Town, South Africa",
    description: "Witness breathtaking mountains and coastlines in Cape Town.",
    price: "₹1,30,000",
    image: "https://images.pexels.com/photos/213940/pexels-photo-213940.jpeg",
  },
];

const Explore = () => {

  const [popup,setPopup] = useState(false)
  const [error,setError] = useState(false)
  const [popupData,setPopupData] = useState("")

  const navigate = useNavigate();
  const {wishList,setWishList} = useContext(UserContext)

  const handleWishList = (e,index) =>{
    e.preventDefault()
    const wishListItem = destinations.find(item => item.name == destinations[index].name)


    const isPresent = wishList.findIndex(item => item.name == wishListItem.name)

    if(isPresent==-1){
      const data = [...wishList,wishListItem]
      setError(false)
      setWishList(data)    
      setPopupData(`${wishListItem.name} added to wishlist`)
      setPopup(true)
    }
    else{
      setPopupData(`${wishListItem.name} already on your wishlist`)
      setError(true)
      setPopup(true)
    }  
  }

  return (
    <>
      <Navbar />
      {/* Hero Section */}
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
            Discover stunning places around the world. Your adventure starts here.
          </p>
          <button
            className="flex mx-auto px-4 py-3 bg-indigo-600 text-white text-lg font-semibold rounded hover:bg-indigo-700 font-agdasima tracking-wider"
            onClick={() => navigate("/pricing")}
          >
            Get Started <MdArrowRightAlt className="my-auto ml-2" size={25} />
          </button>
        </div>
      </div>

      {/* Explore Cards Section */}
      <section className="my-12 flex flex-col w-screen px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 font-libreCaslon">
            Explore Destinations
          </h2>
          <p className="text-gray-600 mb-10 font-poppins">
            Discover stunning places around the world. Find your next travel adventure.
          </p>

          {/* Responsive Cards */}
          <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 font-agdasima">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-600 my-2 font-poppins">
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold font-agdasima text-indigo-600">
                      {destination.price}
                    </span>
                    <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-agdasima"
                    onClick={e=>handleWishList(e,index)}>
                      WishList <IoBookmark className="ml-2" size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

        {popup?<FloatingPopup data={popupData} setPopup={setPopup} error={error} setError={setError} navLink={'/profile'} navName={"Go to WishList"}/>
        :
        null}
    </>
  );
};

export default Explore;
