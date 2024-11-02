import React from 'react';
import Slider from './Slider';

const Home_Popular_Dest = () => {
  return (
    <section className="px-4 h-[90vh]  md:px-8 lg:px-16 py-8 bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Popular Destinations</h2>
      <p className="text-gray-600 mb-8">
        Most popular destinations around the world, from historical places to natural wonders.
      </p>
      <Slider />
    </section>
  );
};

export default Home_Popular_Dest
