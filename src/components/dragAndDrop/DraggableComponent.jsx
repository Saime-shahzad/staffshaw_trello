import React, { useState } from "react";

const DraggableComponent = () => {
  const [draggedElement, setDraggedElement] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dragStart = (event) => {
    setDraggedElement(event.target.id);
    event.dataTransfer.setData("text", event.target.id);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);

    // Get new position
    const rect = draggedElement.getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.top });

    document.getElementById("demo").innerHTML = `The p element was dropped. New position`;
  };

  return (
    <div>
     

      <p>Drag the text up and down between the two rectangles:</p>

      <div
        className="droptarget"
        onDrop={drop}
        onDragOver={allowDrop}
        style={{ width: "100px", height: "35px", padding: "10px", border: "1px solid black" }}
      >
        <p
          onDragStart={dragStart}
          draggable="true"
          id="dragtarget"
          style={{ cursor: "move" }}
        >
          Drag me!
        </p>
      </div>

      <p id="demo">Position: x={position.x}, y={position.y}</p>

      <div
        className="droptarget"
        onDrop={drop}
        onDragOver={allowDrop}
        style={{ width: "100px", height: "35px", padding: "10px", border: "1px solid black" }}
      ></div>
    </div>
  );
};

export default DraggableComponent;
