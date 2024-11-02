import React from 'react';
import Navbar from './Navbar';
import Hero_video from '../assets/Hero_video.mp4';
import { MdArrowRightAlt } from "react-icons/md";

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="Hero_Container_ h-[90vh] relative">

        <div className="Hero_video absolute h-full w-full z-[-5] object-cover border-2 overflow-hidden">
          <video src={Hero_video} autoPlay muted loop className="w-full h-full object-cover"></video>
        </div>

        <div className="Hero_content absolute top-[20%] left-[10%] text-white w-max font-libreCaslon ">
          <p className="text-[4rem] leading-[70px]">Start your unforgettable <br /> journey with us.</p>
          <p className="text-xl mt-3 font-poppins">The best travel for your journey begins now</p>
        </div>

        <div className="Hero_input_section flex absolute bottom-[10%] left-0 h-[20vh] w-[70%] bg-white tracking-wider z-[1]">
          <div className='Hero_Destination_Input flex flex-col w-[20%] my-auto mx-2'>
            <p className=' text-gray-500 font-poppins text-xs '>DESTINATION</p>
            <input type="text" 
            placeholder='- - -'
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-xl'
            />
          </div>

          <div className='Hero_Person_Input flex flex-col w-[20%] my-auto mx-2'>
            <p className=' text-gray-500 font-poppins text-xs'>PERSON</p>
            <input type="text" 
            placeholder='- - -'
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-xl'
            />
          </div>

          <div className='Hero_CheckIn_Input flex flex-col w-[20%] my-auto mx-2'>
            <p className=' text-gray-500 font-poppins text-xs'>CHECK IN</p>
            <input type="date" 
            placeholder=''
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-xl'
            />
          </div>

          <div className='Hero_CheckOut_Input flex flex-col w-[20%] my-auto mx-2'>
            <p className=' text-gray-500 font-poppins text-xs'>CHECK OUT</p>  
            <input type="date" 
            placeholder=''
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-xl'
            />
          </div>

          <div className='Hero_Button flex w-[20%] ml-2 font-libreCaslon h-full bg-black text-white text-[1.2rem] tracking-wider'>
            <button className=' mx-auto'>Click here <span className='block w-max mx-auto'><MdArrowRightAlt size={30} /></span></button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Hero;
