import Navbar from './Navbar';
import BG from '../assets/BG.jpg'
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className=" h-[90vh] sm:h-[90vh] min-[2560px]:h-[70vh] w-[100vw] overflow-x-hidden relative">

        <div className="Hero_video absolute h-full w-full z-[-5] object-cover overflow-hidden">
          <img src={BG} autoPlay muted loop className="w-full h-full object-cover"></img>
        </div>

        <div className=" absolute top-[20%] text-white w-[100vw] font-libreCaslon px-4 sm:left-[5%]">
          <p className="text-[2.5rem] sm:text-[4rem] leading-[50px] sm:leading-[70px]">Start your unforgettable <br /> journey with us.</p>
          <p className="text-lg sm:text-xl mt-3 font-poppins">The best travel for your journey begins now</p>
        </div>

        <div className=" flex flex-col w-[90vw] sm:flex-row absolute bottom-[10%] left-0 sm:w-[70%] bg-white tracking-wider z-[1] sm:px-0">
          <div className='Hero_Destination_Input py-3 px-2 flex flex-col w-full sm:w-[20%] mr-2 sm:my-auto'>
            <p className=' text-gray-500 font-poppins text-xs'>DESTINATION</p>
            <input type="text" 
            placeholder='- - -'
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-lg sm:text-xl'
            />
          </div>

          <div className=' py-3 px-2 flex flex-col w-full sm:w-[20%] mr-2 sm:my-auto'>
            <p className=' text-gray-500 font-poppins text-xs'>PERSON</p>
            <input type="text" 
            placeholder='- - -'
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-lg sm:text-xl'
            />
          </div>

          <div className=' py-3 px-2 flex flex-col w-full sm:w-[20%] mr-2 sm:my-auto'>
            <p className=' text-gray-500 font-poppins text-xs'>CHECK IN</p>
            <input type="date" 
            placeholder=''
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-lg sm:text-xl'
            />
          </div>

          <div className=' py-3 px-2 flex flex-col w-full sm:w-[20%] mr-2 sm:my-auto'>
            <p className=' text-gray-500 font-poppins text-xs'>CHECK OUT</p>  
            <input type="date" 
            placeholder=''
            className=' border-b-[1px] border-black outline-none placeholder-black font-libreCaslon text-lg sm:text-xl'
            />
          </div>

          <div className=' flex w-full px-3 sm:w-[20%] font-libreCaslon bg-black text-white text-[1rem] sm:text-[1.1rem] tracking-wider'>
            <Link to='/pricing' className='mx-auto w-full py-2 flex items-center justify-center'>Click here <FaChevronRight size={11} className="ml-2" /></Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default Hero;
