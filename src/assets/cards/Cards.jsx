import React, { useEffect, useRef, useState } from "react";
import { Card } from "antd";
import "./Cards.css";
import TextArea from "antd/es/input/TextArea";
import { Buttons } from "../button/Buttons";
import icons from "../icons";
import Modals from "../modals/Modals";

export const Cards = ({ icon, data, cardsName }) => {

  const [items, setItems] = useState(data);
  const [itemCardName, setIsCardName] = useState(cardsName);

  

  const dragStart = (event, itemId) => {
    event.dataTransfer.setData("text/plain", JSON.stringify({ itemId, cardsName }));
    
   

    // Create a clone of the card element for the drag image
    const dragImage = event.target.cloneNode(true);
    dragImage.style.position = "absolute";
    dragImage.style.top = "-9999px";
    dragImage.style.backgroundColor = "#FFA500"; // Explicitly set the background color
    dragImage.style.border = "1px solid #ddd"; // Add border
    dragImage.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Adding a shadow
    dragImage.style.padding = "10px"; // Ensure padding matches original card
    document.body.appendChild(dragImage);

    event.dataTransfer.setDragImage(dragImage, 0, 0);

    setTimeout(() => document.body.removeChild(dragImage), 0);

    event.target.classList.add("dragging");
  };

  const dragEnd = (event) => { 
    // console.log("event>>>>", event.target);
    
    event.target.classList.remove("dragging");
    // console.log("event.target>>>", event.target.innerText);
  

    
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drop = (event) => {
    event.preventDefault();
    
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const dropTarget = event.target.closest(".droptarget");
    // console.log(`Data:, `,event.target);

    if (dropTarget && !dropTarget.contains(document.getElementById(data.itemId))) {
      const draggedElement = document.getElementById(data.itemId);
      dropTarget.appendChild(draggedElement);

      // Log or use the card name where the card is dropped
      const taskId = draggedElement.getAttribute("data-tskId");
      console.log(`draggedElement:`, draggedElement);
      console.log(`Task ID:`, taskId);
      
      setIsCardName(cardsName)
      const dragedContent={
        cardNames:cardsName,
        content: draggedElement?.innerText,
        task_id:taskId
      }
      console.log(`dragedContent, `, dragedContent);
    } 
   
    // console.log(`updated Card name, `, itemCardName);
  };

  useEffect(() => {
    
  }, [itemCardName])
  
  const [isAddList, setIsAddList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputValue = useRef(null);

  const handleAddList = () => {
    setIsAddList(true);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    console.log("e>>>>", inputValue?.current?.resizableTextArea?.textArea?.value);
    
    setIsAddList(false);
    const newItem = inputValue?.current?.resizableTextArea?.textArea?.value;
    if (newItem) {
      setItems([...items, { description: newItem }]);
    }
  };

  return (
    <div className="card-parent d-flex flex-column">
      <Card
        title={cardsName}
        bordered={false}
        style={{ width: 300, backgroundColor: "#F1F2F4" }}
        className="droptarget"
        onDrop={drop}
        onDragOver={allowDrop}
      >
        {items?.map((item, index) => (
          <div
            key={index}
            className="parent d-flex justify-content-between bg-white hoverControl rounded-2 m-1 p-2"
            id={`dragtarget-${index}-${cardsName}`}
            draggable="true"
            onDragStart={(event) => dragStart(event, `dragtarget-${index}-${cardsName}`)}
            onDragEnd={dragEnd}
            data-tskId={item.taskId}x
          >
            <div 

            className="description-parent" onClick={() => setIsModalOpen(true)}>
              {item.description}
            </div>
            {isModalOpen && (
              <Modals isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            )}
            <div>{icon}</div>
          </div>
        ))}

        {isAddList ? (
          <div className="textArea-Parent w-100 p-1 border-dark-subtle">
            <TextArea
              ref={inputValue}
              placeholder="Add Task"
              className="textArea-control"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <div className="d-flex pt-1">
              <Buttons
                className="fw-bold text-white"
                type="button"
                text="Add card"
                onClick={handleAddCard}
              />
              <div
                className="p-1 mx-2"
                onClick={() => setIsAddList(false)}
                style={{ cursor: "pointer" }}
              >
                {icons.popupclose}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="parent d-flex border-1 justify-content-between bg-white hoverControl rounded-2 m-1 p-2"
            onClick={handleAddList}
          >
            <div className="description-parent">Add Your task</div>
            <div>{icon}</div>
          </div>
        )}
      </Card>
    </div>
  );
};
