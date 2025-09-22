import React from 'react';
import {useNavigate} from 'react-router-dom'
import { FaChevronRight } from "react-icons/fa";
const SpecialOffer = () => {

  const navigate = useNavigate()

  const cardData = [
    {
      title: 'Lisbon, Portugal',
      price: '₹1,50,000',
      description: '5 nights and 6 days in a 5-star hotel, breakfast and lunch included. Enjoy popular dining spots and historical tours.',
      imageUrl: 'https://images.pexels.com/photos/2867883/pexels-photo-2867883.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Athens, Greece',
      price: '₹1,80,000',
      description: '5 nights and 6 days in a 5-star hotel, breakfast and lunch included. Visit famous landmarks and museums.',
      imageUrl: 'https://images.pexels.com/photos/3449662/pexels-photo-3449662.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      title: 'Rome, Italy',
      price: '₹1,75,000',
      description: '5 nights and 6 days in a 5-star hotel, breakfast and lunch included. Explore ancient ruins and authentic cuisine.',
      imageUrl: 'https://images.pexels.com/photos/2928058/pexels-photo-2928058.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <section className="w-full my-[60px] flex flex-col justify-center bg-white px-4 md:px-0">
      {/* Header */}
      <div className="mb-6 w-max mr-[5%] text-center md:text-right mx-auto">
        <h2 className="text-2xl font-libreCaslon tracking-wider md:text-3xl font-semibold text-gray-800 mb-2">Special Offer</h2>
        <div className="flex justify-center md:justify-end">
          <p className="w-[30%] md:w-[8vw] border-2 border-gray-700 text-center"></p>
        </div>
        <p className="text-gray-600 mb-8 mt-3 font-poppins text-center md:text-right">Check out our special offer and discounts</p>
      </div>

      {/* Carousel */}
      <div className="relative flex justify-evenly w-full md:w-[90%] mx-auto">
        {/* Cards Wrapper */}
        <div className="flex w-full md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto min-[2560px]:w-[85%] min-[2560px]:gap-x-16 snap-x snap-mandatory px-4 py-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 md:flex-shrink w-72 sm:w-80 md:w-full border-2 bg-white rounded-lg overflow-hidden shadow-md snap-center"
            >
              {/* Image */}
              <div className="h-60 min-[780px]:h-[20vh] min-[1024px]:h-[35vh] min-[2560px]:h-[30vh] bg-cover bg-center" style={{ backgroundImage: `url(${card.imageUrl})` }}></div>
          
              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold font-libreCaslon text-lg mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm font-poppins line-clamp-2">{card.description}</p>
          
                {/* Price & Button */}
                <div onClick={()=>{
                  navigate('/pricing')
                  window.scrollTo({top:0,behavior:"smooth"})
                }} className="mt-4 flex items-center justify-between">
                  <span className="text-orange-500 font-semibold font-agdasima text-lg">{card.price}</span>
                  <button className="px-4 py-2 flex justify-center bg-orange-500 font-agdasima tracking-wide text-white rounded-lg hover:bg-orange-600 transition duration-300">
                    DETAILS <FaChevronRight size={12} className="ml-2 h-max my-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default SpecialOffer;
