import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'; 
import { FaEye, FaEdit } from 'react-icons/fa'; 

const ImageOptionsModal = ({ isOpen, onView, onEdit, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors duration-200 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-libreCaslon font-bold text-center text-gray-800 mb-6">Choose an Option</h3>
          
          <div className="flex flex-col space-y-4">
            <button 
              onClick={onView} 
              className="flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out text-lg font-semibold font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              <FaEye className="mr-3 text-xl" />
              View Image
            </button>
            
            <button 
              onClick={onEdit} 
              className="flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-200 ease-in-out text-lg font-semibold font-poppins focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
              <FaEdit className="mr-3 text-xl" />
              Edit Image
            </button>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={onClose} 
              className="inline-flex shadow-black shadow-sm justify-center px-4 py-2 text-black rounded-md hover:bg-black hover:text-white transition-colors duration-200 font-poppins text-base focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageOptionsModal;