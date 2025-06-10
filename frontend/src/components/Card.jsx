import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

const Card = ({ title, location, image }) => {
  return (
    <div
      className="h-[45vh] sm:h-[65vh] min-h-[200px] w-full rounded-lg overflow-hidden bg-cover bg-center flex items-end border relative"
      style={{ backgroundImage: `url("${image}")` }} // Ensure correct URL format
    >
      <div className="bg-black bg-opacity-70 text-white p-4 w-full">
        <h3 className="text-lg font-agdasima tracking-wider">{title}</h3>
        <p className="text-sm flex items-center font-agdasima tracking-wider">
          <FaLocationDot size={15} className="mr-1" />
          {location}
        </p>
      </div>
    </div>
  );
};

export default Card;
