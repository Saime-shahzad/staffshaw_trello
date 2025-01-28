import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import icons from '../icons';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const ImageDragDrop = () => {
    const [images, setImages] = useState([]);

    const handleChange = (fileList) => {
        // Validate and process the uploaded files
        const validFiles = Array.from(fileList).filter(file => file instanceof File);

        // Generate preview URLs for each valid file
        const imageFiles = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        // Accumulate selected files in the images array
        setImages(prevImages => [...prevImages, ...imageFiles]);

        // Debugging: log valid files
        console.log("Valid files:", validFiles);
    };

    return (
        <div>
            {/* Customized FileUploader */}
            <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                multiple // Enable multiple file uploads
            >
                <button
                    style={{
                        padding:"5px 10px",
                        backgroundColor: '#091e420f',
                        color: '#172b4d',
                        border: 'none',
                        cursor: 'pointer',
                        width:"130px"
                    }}
                    className='mt-2'
                >
                   {icons.fileUploadIcons} Attach Files
                </button>
            </FileUploader>

            {/* Display uploaded images */}
            <div style={{ display: 'flex' , flexWrap:"wrap", marginTop: '20px' }}>
                {images.map((image, index) => ( 
                    <div key={index} style={{ margin: '10px' }}>
                        <img
                            src={image.preview}
                            alt="Preview"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>
        
          
        </div>
    );
};

export default ImageDragDrop;
