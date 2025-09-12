import React, { useState } from 'react';
import axios from 'axios';

const Upload = ({ userEmail, token, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        setMessage('');
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload!');
            return;
        }

        setUploading(true);
        setMessage('Uploading...');

        const formData = new FormData();
        formData.append('image', file);

        try {
            await axios.post(
                `http://localhost:5000/api/upload-image`, // Ensure this URL matches your backend
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setMessage('Upload successful!');
            setUploading(false);
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setMessage(error.response?.data?.error || 'Failed to upload image.');
            setUploading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="file" 
                accept=".jpg, .jpeg, .png, .webp" 
                onChange={handleFileChange} 
                disabled={uploading}
            />
            <button type="submit" disabled={!file || uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Upload;