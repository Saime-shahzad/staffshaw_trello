import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import Modals from '../modals/Modals';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const ImageDragDrop = () => {
    const [images, setImages] = useState([]);

    const handleChange = (files) => {
        // Convert the files object to an array
        const validFiles = Array.from(files).filter(file => file instanceof File);

        // Debugging to check file types
        console.log("Valid files:", validFiles);

        // Generate preview URLs for each valid file
        const imageFiles = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        // Accumulate selected files in the images array
        setImages(prevImages => [...prevImages, ...imageFiles]);
       
    };
    return (
        <div>
            <FileUploader
                handleChange={handleChange}
                name="images"
                types={fileTypes}
                multiple={true} // Enable multiple file selection
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {images.map((file, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img src={file.preview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    </div>
                ))}
                {images.length && <Modals imageData={images} />}
                
            </div>
        </div>
    );
};

export default ImageDragDrop;
