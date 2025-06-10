import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContextProvider';
import { BiSolidErrorAlt } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";


const AlertBox = () => {
    const { alertBox, setAlertBox } = useContext(UserContext);

    const handleCloseAlert = () => {
        setAlertBox(prevAlertBox => ({
            ...prevAlertBox,
            isOpen: false,
            message: "",
            isError: false
        }));
    };

    useEffect(() => {
        if (alertBox.isOpen) {
            const timer = setTimeout(() => {
                handleCloseAlert();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alertBox.isOpen]);

    if (!alertBox.isOpen) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-[100]
                        bg-white shadow-lg p-4 rounded-md border border-gray-200
                        flex items-center gap-3
                        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-auto
                        font-poppins
                        animate-slideInFromRight"
        >
            {alertBox.isError ?
                <BiSolidErrorAlt className="text-red-700 w-6 h-6 flex-shrink-0" />
                :
                <TiTick className="text-blue-800 w-6 h-6 flex-shrink-0" />
            }

            <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between w-full">
                    <span className="text-gray-800 text-sm sm:text-base pr-2">
                        {alertBox.message}
                    </span>
                    <button
                        onClick={handleCloseAlert}
                        className="text-gray-500 hover:text-gray-700 flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Close alert"
                    >
                        <IoMdClose className="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlertBox;