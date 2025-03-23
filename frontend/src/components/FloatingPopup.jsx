import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { PiSealCheckFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

const FloatingPopup = ({ data, setPopup, error, setError }) => {
  useEffect(() => {
    const timer = setTimeout(() =>{ 
        setError(false)
        setPopup(false)
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-[10%] right-[5%] z-10 bg-white shadow-lg p-4 rounded-md border border-gray-200 flex items-center gap-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-auto">
      {
        error?<FiAlertTriangle className="text-red-700 w-6 h-6 flex-shrink-0" />
        :
        <PiSealCheckFill className="text-blue-800 w-6 h-6 flex-shrink-0" />
      }
      <div className="flex items-center justify-between w-full">
        <span className="text-gray-700 text-sm sm:text-base font-poppins">{data}</span>
        <button onClick={() => setPopup(false)} className="text-gray-500 hover:text-gray-700 mx-3">
          <IoClose className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
};

export default FloatingPopup;
