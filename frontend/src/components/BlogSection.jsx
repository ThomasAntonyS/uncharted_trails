import React from 'react';
import { FaChevronRight } from "react-icons/fa";

const BlogSection = () => {
  return (
    <section className="p-6 bg-white rounded-lg max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl text-gray-800 font-bold font-libreCaslon tracking-wider">
          Our Experience Stories
        </h2>
        <div className="flex justify-center">
          <p className="w-20 mt-1 mb-1 border-2 border-gray-700"></p>
        </div>
        <p className="text-gray-600 font-poppins tracking-wider">
          You will find the incredible experience in the world
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        {/* Image Section */}
        <div className="h-auto w-full md:w-1/2">
          <img
            src="https://images.pexels.com/photos/3757139/pexels-photo-3757139.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Beautiful Italy"
            className="rounded-lg w-full h-[300px] md:h-[400px] object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-4 font-agdasima tracking-wide text-[1.5rem]">
            Beautiful Italy<br />Let's travel
          </h3>
          <p className="text-gray-600 mb-6 font-poppins tracking-wider">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because it is pleasure,
            but because those who do not know how to pursue pleasure rationally
            encounter consequences that are extremely painful. Nor again is there
            anyone who loves or pursues.
          </p>
          <a href="#/blog/2" className="flex w-max font-agdasima text-orange-500 font-semibold underline sm:no-underline hover:underline">
            Read More <span className=' h-max my-auto ml-1 mt-[7px]'><FaChevronRight size={12}/></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
