import React from 'react';
import Slider from './Slider';

const Popular_Dest = () => {
  return (
    <section className="px-4 flex flex-col justify-center h-[85vh] md:px-8 lg:px-16 py-8 bg-white">
      <h2 className="text-2xl font-libreCaslon tracking-wider md:text-3xl font-semibold text-gray-800 mb-2">Popular Destinations</h2>
      <div className='w-[25vh] border-2 border-gray-700'></div>
      <p className="text-gray-600 mb-8 mt-3 font-poppins">
        Most popular destinations around the world, from historical places to natural wonders.
      </p>
      <Slider />
    </section>
  );
};

export default Popular_Dest