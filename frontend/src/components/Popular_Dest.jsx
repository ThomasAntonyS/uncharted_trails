import React from 'react';
import Slider from './Slider';

const Popular_Dest = () => {
  return (
    <section className="flex flex-col justify-center w-[100vw] py-8 bg-white">
      <h2 className="text-2xl ml-[5%] font-libreCaslon tracking-wider md:text-3xl font-semibold text-gray-800 mb-2">Popular Destinations</h2>
      <div className='w-[25vh] border-2 border-gray-700 ml-[5%]'></div>
      <p className="text-gray-600 mb-8 ml-[5%] mt-3 font-poppins">
        Most popular destinations around the world, from historical places to natural wonders.
      </p>
      <div className=' w-screen flex items-center'>
        <Slider />
      </div>
    </section>
  );
};

export default Popular_Dest
