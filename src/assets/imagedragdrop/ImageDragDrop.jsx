import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import icons from "../icons";
import { useDispatch } from "react-redux";
import { addCardsAttachment } from "../../redux-store/cardsSlice/cardsSlice";
import { domainForFile } from "../../redux-store/apiRouts/apiRouts";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "PDF", "DOC", "DOCX"];

const ImageDragDrop = (cardData) => {
  console.log("cardData????", cardData);

  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const formData = new FormData();

  const handleChange = async (fileList) => {
    // Validate and process the uploaded files
    const validFiles = Array.from(fileList).filter(
      (file) => file instanceof File
    );

    // console.log("fileList>>>" , fileList);
    if (fileList) {
      const imageObject = {
        file: fileList[0],
        file_name: fileList[0]?.name,
        cardId: cardData?.cardData?.card?.id,
      };
      formData.append("file", fileList[0]);
      formData.append("file_name", fileList[0]?.name);
      const response = await dispatch(addCardsAttachment(imageObject));
      console.log("response>>>>> from front ", response);
    }
    // Generate preview URLs for each valid file
    const imageFiles = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    // Accumulate selected files in the images array
    setImages((prevImages) => [...prevImages, ...imageFiles]);

    // Debugging: log valid files
    console.log("Valid files:", validFiles);
  };
  useEffect(() => {
    if (cardData?.cardData?.attachments) {
      console.log("Attachments Data:", cardData.cardData.attachments);

      const validFiles = cardData.cardData.attachments
        .map((fileObj) => {
          // If it's already a File instance
          if (fileObj instanceof File) {
            return { file: fileObj, preview: URL.createObjectURL(fileObj) };
          }
          // Convert object into a File instance
          else if (
            typeof fileObj === "object" &&
            fileObj.name &&
            fileObj.path
          ) {
            // Create a fake file using Blob
            const fakeFile = new File(
              [new Blob()], // Empty Blob (since we don't have actual file content)
              fileObj.name, // Use the file name
              { type: fileObj.type } // Set MIME type based on extension
            );
            return {
              file: fakeFile,
              preview: `${domainForFile}/${fileObj.path}`,
              path:fileObj.path
            };
          }
          return null;
        })
        .filter(Boolean); // Remove any null values

      console.log("Processed Image Files:", validFiles);
      setImages(validFiles);
    }
  }, [cardData]);

  
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
            padding: "5px 10px",
            backgroundColor: "#091e420f",
            color: "#172b4d",
            border: "none",
            cursor: "pointer",
            width: "130px",
          }}
          className="mt-2"
        >
          {icons.fileUploadIcons} Attach Files
        </button>
      </FileUploader>

      {/* Display uploaded images */}
      <div
        style={{
          //     display: "flex",
          //   flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{ display: "flex", margin: "10px", cursor: "pointer" }}
            onClick={() => {
                const fileUrl = `${domainForFile}${image.file.path}`;
                const link = document.createElement("a");
                link.download = fileUrl; // This will trigger the download
                link.click(); // Programmatically trigger the click event
              }}
          >
            <>
              {image?.file.type === "pdf" || image?.file.type === "docx" ? (
                <div
                  className=" d-flex justify-content-center align-items-center "
                  style={{
                    width: "140px",
                    height: "100px",
                    objectFit: "cover",
                    backgroundColor: "#172b4d",
                  }}
                >
                  {icons.filePdfOutlinedIcon}
                </div>
              ) : (
                <img
                  src={image.preview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div className="bg-light p-3">
                File Name : {image?.file.name}
                <div>type : {image?.file.type}</div>
              </div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDragDrop;
