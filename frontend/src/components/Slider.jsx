import React, { useState, useRef, useEffect } from 'react';
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
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, clientWidth } = el;
    const scrollAmount = clientWidth * 0.8;

    el.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;

    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();

      return () => {
        el.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  return (
    <div className="relative w-[90%] mx-auto py-6 h-[65vh] min-[2560px]:h-[55vh] overflow-hidden">
      {!atStart && (
        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 left-1 z-10 p-2 bg-gray-800 text-white rounded-full transform -translate-y-1/2 hover:bg-gray-700"
        >
          <FaArrowLeft className="h-7 w-7" />
        </button>
      )}

      {/* Right Arrow */}
      {!atEnd && (
        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 right-1 z-10 p-2 bg-orange-500 text-white rounded-full transform -translate-y-1/2 hover:bg-orange-600"
        >
          <FaArrowRight className="h-7 w-7" />
        </button>
      )}

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll no-scrollbar scroll-smooth gap-4 h-full"
      >
        {destinations.map((destination) => (
          <div key={destination.id} className="flex-shrink-0 h-full w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] xl:w-[20vw]">
            <Card {...destination} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
