import React, { useState } from 'react';
import axios from 'axios';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import { AiOutlineClose } from 'react-icons/ai';

const ImageUploadPopup = ({ isOpen, onClose, onUploadSuccess, userEmail, token }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setMessage('');
        }
    };

    const handleUploadClick = async () => {
        if (!selectedFile) {
            setMessage('Please select a file to upload.');
            return;
        }

        setUploading(true);
        setMessage('Uploading...');

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/upload-image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setMessage("");
            setUploading(false);
            onUploadSuccess(response.data.imageUrl); 

            setTimeout(() => {
              onClose();
            }, 1000);

        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to upload image.');
            setUploading(false);
        }
    };

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
                    <HiOutlineCloudArrowUp size={48} className="text-blue-500 mb-4" />
                    <h3 className="text-[1.2rem] font-semibold mb-2 font-agdasima tracking-wide">Upload New Profile Picture</h3>
                    <p className="text-gray-800 mb-6 text-[1rem] font-libreCaslon">
                        {selectedFile ? `File selected: ${selectedFile.name}` : 'Select an image file to upload.'}
                    </p>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".jpg, .png, .webp, .jpeg"
                        id="file-upload"
                    />
                    <div className="flex justify-center space-x-4 font-agdasima tracking-wide w-full">
                        <label
                            htmlFor="file-upload"
                            className="px-4 py-2 border border-gray-300 text-black font-bold rounded cursor-pointer hover:bg-gray-100"
                        >
                            Choose File
                        </label>
                        <button
                            onClick={handleUploadClick}
                            className={`px-4 py-2 text-white rounded transition-colors ${
                                selectedFile && !uploading ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!selectedFile || uploading}
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    {message && <p className={`${message === 'Uploading...' ? "animate-pulse" : "animate-none"} mt-4 text-sm font-poppins text-gray-900`}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ImageUploadPopup;