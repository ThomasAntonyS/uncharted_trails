import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

const ConfirmDeletePopup = ({ isOpen, onClose, onConfirm, destinationName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <AiOutlineClose size={20} />
        </button>

        <div className="flex flex-col items-center text-center mt-5">
          <HiOutlineExclamationCircle size={48} className="text-red-600 mb-4" />
          <h3 className="text-[1.2rem] font-semibold mb-2 font-agdasima tracking-wide">Remove Destination?</h3>
          <p className="text-gray-800 mb-6 text-[1.4rem] font-libreCaslon">
            Do you want to remove <span className="font-semibold text-red-600">{destinationName}</span> from your wishlist?
          </p>
          <div className="flex justify-center space-x-4 font-agdasima tracking-wide">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-black font-bold rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
