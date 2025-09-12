import { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer";
import { IoBookmark } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContextProvider";
import FloatingPopup from "../components/FloatingPopup";
import { destinations } from "../data/data";
import { Ring2 } from 'ldrs/react';
import 'ldrs/react/Ring2.css';

const Explore = () => {
    const [popup, setPopup] = useState(false);
    const [error, setError] = useState(false);
    const [popupData, setPopupData] = useState("");
    const [loading, setLoading] = useState(true);
    const authToken = sessionStorage.getItem("authToken");
    const {setAlertBox} = useContext(UserContext)

    document.title = "Uncharted Trails | Explore";

    const navigate = useNavigate();
    const { wishList, setWishList } = useContext(UserContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleWishList = (e, index) => {
        e.preventDefault();
        if(!authToken){
          setAlertBox({
            isOpen: true,
            message: "Please Log-in to wishlist.",
            isError: true  
          })
          return
        }
        const wishListItem = destinations.find(item => item.location === destinations[index].location);

        const isPresent = wishList.findIndex(item => item.location === wishListItem.location);

        if (isPresent === -1) {
            const data = [...wishList, wishListItem];
            setError(false);
            setWishList(data);
            setPopupData(`${wishListItem.location} added to wishlist`);
            setPopup(true);
        } else {
            setPopupData(`${wishListItem.location} already on your wishlist`);
            setError(true);
            setPopup(true);
        }
    };

    return (
        <>
            <Navbar />
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
                        Get Started <FaChevronRight className="my-auto ml-2" size={15} />
                    </button>
                </div>
            </div>

            <section className="my-12 flex flex-col w-screen px-6">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800 font-libreCaslon">
                        Explore Destinations
                    </h2>
                    <p className="text-gray-600 mb-10 font-poppins">
                        Discover stunning places around the world. Find your next travel adventure.
                    </p>

                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <Ring2 size="40" stroke="5" strokeLength="0.25" bgOpacity="0.1" speed="0.8" color="black" />
                        </div>
                    ) : (
                        <div className="relative w-[90%] md:w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {destinations.slice(0, 6).map((destination, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
                                >
                                    <img
                                        src={destination.imageUrl}
                                        alt={destination.location}
                                        className="w-full h-52 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 text-left sm:text-center font-agdasima">
                                            {destination.location}
                                        </h3>
                                        <p className="text-sm text-gray-600 my-2 font-poppins text-left sm:text-center line-clamp-2">
                                            {destination.description}
                                        </p>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-lg font-bold font-agdasima text-indigo-600">
                                                {destination.price}
                                            </span>
                                            <button
                                                className="flex items-center px-4 py-2 bg-indigo-600 text-white text-[.9rem] rounded hover:bg-indigo-700 font-libreCaslon font-semibold tracking-wider"
                                                onClick={e => handleWishList(e, index)}
                                            >
                                                Wishlist <IoBookmark className="ml-2" size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />

            {popup ? (
                <FloatingPopup
                    data={popupData}
                    setPopup={setPopup}
                    error={error}
                    setError={setError}
                    navLink={"/profile"}
                    navName={"Go to WishList"}
                />
            ) : null}
        </>
    );
};

export default Explore;