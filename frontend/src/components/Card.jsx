import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import {Link} from 'react-router-dom'


const Card = ({ title, location, image }) => {
  return (
    <Link to={'/'}
      className=" h-full w-[95%] rounded-lg overflow-hidden bg-cover bg-center flex items-end border font-agdasima tracking-wider"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-black bg-opacity-40 text-white p-4 w-full">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm flex"><span className='my-auto mr-1'><FaLocationDot size={15}/></span>{location}</p>
      </div>
    </Link>
  );
};

export default Card;
