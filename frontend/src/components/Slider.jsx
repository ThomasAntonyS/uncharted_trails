// src/components/Slider.js
import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Card from './Card';

const destinations = [
  {
    id: 1,
    title: 'Serenity Beach',
    location: 'Maldives',
    image: 'https://images.pexels.com/photos/8299943/pexels-photo-8299943.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
  },
  {
    id: 2,
    title: 'Mountain Majesty',
    location: 'Switzerland',
    image: 'https://images.pexels.com/photos/2724664/pexels-photo-2724664.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    title: 'Urban Exploration',
    location: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/5745029/pexels-photo-5745029.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Historical Haven',
    location: 'Rome, Italy',
    image: 'https://images.pexels.com/photos/29118152/pexels-photo-29118152/free-photo-of-florence-cathedral-dome-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    title: 'Safari Adventure',
    location: 'Kenya',
    image: 'https://images.pexels.com/photos/14510929/pexels-photo-14510929.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    title: 'Tropical Paradise',
    location: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 7,
    title: 'Cultural Delight',
    location: 'Marrakech, Morocco',
    image: 'https://images.pexels.com/photos/4652060/pexels-photo-4652060.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 8,
    title: 'Rialto Bridge',
    location: 'Venice, Italy',
    image: 'https://images.pexels.com/photos/18781029/pexels-photo-18781029/free-photo-of-rialto-bridge-in-venice.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 9,
    title: 'Coastal Escape',
    location: 'Amalfi Coast, Italy',
    image: 'https://images.pexels.com/photos/2188981/pexels-photo-2188981.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 10,
    title: 'Desert Dunes',
    location: 'Dubai, UAE',
    image: 'https://images.pexels.com/photos/10882184/pexels-photo-10882184.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 11,
    title: 'Enchanted Forest',
    location: 'British Columbia, Canada',
    image: 'https://images.pexels.com/photos/6272212/pexels-photo-6272212.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];



const Slider = () => {
  const [current, setCurrent] = useState(0);

  const cards = destinations.length ;

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? cards - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === cards - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex h-[80%] w-[90%] mx-auto overflow-hidden">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 z-10 ml-2 p-2 bg-gray-800 rounded-full text-white transform -translate-y-1/2"
      >
        <FaArrowLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 z-10 mr-2 p-2 bg-orange-500 rounded-full text-white transform -translate-y-1/2"
      >
        <FaArrowRight className="h-6 w-6" />
      </button>

      {/* Slider Container */}
      <div
        className="h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 20}%)` }}
      >
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="min-w-[calc(100%/4)] flex-shrink-0"
          >
            <Card {...destination} />
          </div>
        ))} 
      </div>
    </div>
  );
};

export default Slider;
