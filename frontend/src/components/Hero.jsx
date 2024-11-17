import React from 'react';
import Navbar from './Navbar';
import Hero_video from '../assets/Hero_video.mp4';
import { MdArrowRightAlt } from "react-icons/md";

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="Hero_Container_ h-[90vh] w-[100vw] overflow-x-hidden relative">

        <div className="Hero_video absolute h-full w-full z-[-5] object-cover overflow-hidden">
          <video src={Hero_video} autoPlay muted loop className="w-full h-full object-cover"></video>
        </div>

        <div className="Hero_content absolute top-[20%] text-white w-[100vw] font-libreCaslon px-4 sm:left-[5%] md:left-[10%] lg:left-[15%]">
          <p className="text-[2.5rem] sm:text-[4rem] leading-[50px] sm:leading-[70px]">Start your unforgettable <br /> journey with us.</p>
          <p className="text-lg sm:text-xl mt-3 font-poppins">The best travel for your journey begins now</p>
        </div>

        <div className="Hero_input_section flex flex-col w-[90vw] sm:flex-row absolute bottom-[10%] left-0 sm:w-[70%] bg-white tracking-wider z-[1] sm:px-0">
          <div className='Hero_Destination_Input py-3 px-2 flex flex-col w-full sm:w-[20%] mr-2 sm:my-auto'>
            <p className=' text-gray-500 font-poppins text-xs'>DESTINATION</p>
            <input type="text" 
            placeholder='- - -'
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-lg sm:text-xl'
            />
          </div>

          <div className='Hero_Person_Input py-3 px-2 flex flex-col w-full sm:w-[20%] mr-2 sm:my-auto'>
            <p className=' text-gray-500 font-poppins text-xs'>PERSON</p>
            <input type="text" 
            placeholder='- - -'
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-lg sm:text-xl'
            />
          </div>

          <div className='Hero_CheckIn_Input py-3 px-2 flex flex-col w-full sm:w-[20%] mr-2 sm:my-auto'>
            <p className=' text-gray-500 font-poppins text-xs'>CHECK IN</p>
            <input type="date" 
            placeholder=''
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-lg sm:text-xl'
            />
          </div>

          <div className='Hero_CheckOut_Input py-3 px-2 flex flex-col w-full sm:w-[20%] mr-2 sm:my-auto'>
            <p className=' text-gray-500 font-poppins text-xs'>CHECK OUT</p>  
            <input type="date" 
            placeholder=''
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-lg sm:text-xl'
            />
          </div>

          <div className='Hero_Button flex w-full sm:w-[20%] font-libreCaslon bg-black text-white text-[1rem] sm:text-[1.2rem] tracking-wider'>
            <button className='mx-auto w-full py-2 flex items-center justify-center'>Click here <MdArrowRightAlt size={30} className="ml-2" /></button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Hero;
