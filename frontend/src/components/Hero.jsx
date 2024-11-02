import React from 'react';
import Navbar from './Navbar';
import Hero_video from '../assets/Hero_video.mp4';

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="Hero_Container_ h-[90vh] relative">

        <div className="Hero_video absolute h-full w-full z-[-5] object-cover border-2 overflow-hidden">
          <video src={Hero_video} autoPlay muted loop className="w-full h-full object-cover"></video>
        </div>

        <div className="Hero_content absolute top-[20%] left-0 text-white w-full">
          <p className="text-3xl ">Start your unforgettable <br /> journey with us.</p>
          <p className="text-xl mt-2">The best travel for your journey begins now</p>
        </div>

        <div className="Hero_input_section flex absolute bottom-[10%] left-0 h-[15vh] w-[70%] border-2 ">
          <div className='Hero_Destination_Input flex flex-col w-[20%] my-auto mx-2'>
            <p>DESTINATION</p>
            <input type="text" placeholder='Hi'/>
          </div>

          <div className='Hero_Person_Input flex flex-col w-[20%] my-auto mx-2'>
            <p>PERSON</p>
            <input type="text" placeholder='Hi'/>
          </div>

          <div className='Hero_CheckIn_Input flex flex-col w-[20%] my-auto mx-2'>
            <p>CHECK IN</p>
            <input type="text" placeholder='Hi'/>
          </div>

          <div className='Hero_CheckOut_Input flex flex-col w-[20%] my-auto mx-2'>
            <p>CHECK OUT</p>  
            <input type="text" placeholder='Hi'/>
          </div>

          <div className='Hero_Button w-[20%] my-auto mx-2'>
            <button>Click here</button>
            <p>abc</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Hero;
