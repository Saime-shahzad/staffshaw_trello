import React, {
  useEffect,
  // useEffect,
  useRef,
  useState,
} from "react";
import { Card } from "antd";
import "./Cards.css";
import TextArea from "antd/es/input/TextArea";
import { Buttons } from "../button/Buttons";
import icons from "../icons";
import Modals from "../modals/Modals";
import { addList } from "../../redux-store/listSlice/listSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTask } from "../../redux-store/task/taskSlice";

export const Cards = ({
  icon,
  data,
  cardsName,
  boardId,
  cardKey,
  cardlistId,
}) => {
  console.log("data>>>>", data);
  console.log("cardsName>>>>", cardsName);

  // const [itemCardName, setIsCardName] = useState(cardsName);
  const [isAddList, setIsAddList] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDatas, setIsDatas] = useState([]);
  const inputValue = useRef(null);
  const dispatch = useDispatch();

  const dragStart = (event, itemId) => {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ itemId, cardsName })
    );

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
    // // console.log("event>>>>", event.target);

    event.target.classList.remove("dragging");
    // // console.log("event.target>>>", event.target.innerText);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drop = (event) => {
    event.preventDefault();

    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const dropTarget = event.target.closest(".droptarget");
    // // console.log(`Data:, `,event.target);

    if (
      dropTarget &&
      !dropTarget.contains(document.getElementById(data.itemId))
    ) {
      const draggedElement = document.getElementById(data.itemId);
      dropTarget.appendChild(draggedElement);

      // Log or use the card name where the card is dropped
      const taskId = draggedElement.getAttribute("data-tskId");
      // console.log(`draggedElement:`, draggedElement);
      // console.log(`Task ID:`, taskId);

      // setIsCardName(cardsName)
      const dragedContent = {
        cardNames: cardsName,
        content: draggedElement?.innerText,
        task_id: taskId,
      };
      console.log(`dragedContent, `, dragedContent);
    }

    // // console.log(`updated Card name, `, itemCardName);
  };

  const handleAddList = (e) => {
    setIsAddList(e);
  };

  const handleAddCard = async (e) => {
    e.preventDefault();

    setIsAddList("");
    if (
      inputValue?.current?.resizableTextArea?.textArea.placeholder ===
      "Add List"
    ) {
      const description =
        inputValue?.current?.resizableTextArea?.textArea?.value;
      const finalobj = {
        boardId: String(boardId),
        title: description,
      };
      // await dispatch(addList({title : description}))
      const response = await dispatch(addList(finalobj));
      if (response) {
        toast.success("List Added Successfully");
      }
    } else {
      const taskDescription =
        inputValue?.current?.resizableTextArea?.textArea?.value;
      const finalobj = {
        title: taskDescription,
        cardId: inputValue?.current?.resizableTextArea?.textArea?.id,
      };
      const response = dispatch(addTask(finalobj));
      console.log("response>>>>", response);
      if (response === 200) {
        toast.success("Task Added Successfully");
      }
    }
    // const newItem = inputValue?.current?.resizableTextArea?.textArea?.value;
    // if (newItem) {
    //   setItems([...items, { description: newItem }]);
    // }
    // console.log("items>>>", inputValue?.current?.resizableTextArea?.textArea?.id);
  };
  console.log("cardsName>>>>ddd", cardsName);

  // useEffect(() => {
  //   setIsDatas(data);
  //   console.log("ok");
  // }, [data]);

  return (
    <div className="card-parent">
      {cardsName}
      {/* <Card
        key={cardKey}
        title={cardsName}
        // title={items.title ? items.title :""}
        bordered={false}
        style={{ width: 300, backgroundColor: "#F1F2F4" }}
        className="droptarget"
        onDrop={drop}
        onDragOver={allowDrop}
      >
        {cardsName === "Add New List"
          ? " "
          : data?.map((item, index) => (
              <div
                key={index}
                className="parent d-flex justify-content-between bg-white hoverControl rounded-2 m-1 p-2"
                id={`dragtarget-${index}-${cardsName}`}
                draggable="true"
                onDragStart={(event) =>
                  dragStart(event, `dragtarget-${index}-${cardsName}`)
                }
                onDragEnd={dragEnd}
                data-tskId={item.taskId}
              >
                <div
                  className="description-parent"
                  onClick={() => setIsModalOpen(true)}
                >
                  {item.title}
                </div>
                {isModalOpen && (
                  <Modals
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                )}
                <div>{icon}</div>
              </div>
            ))}

        {isAddList ? (
          <div className="textArea-Parent w-100 p-1 border-dark-subtle">
            <TextArea
              id={cardlistId}
              ref={inputValue}
              placeholder={isAddList === "listAdd" ? "Add List" : "Add Task"}
              className="textArea-control"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <div className="d-flex pt-1">
              <Buttons
                className="fw-bold text-white"
                type="button"
                text={isAddList === "listAdd" ? "Add List" : "Add Task"}
                onClick={handleAddCard}
              />
              <div
                className="p-1 mx-2"
                onClick={() => setIsAddList("")}
                style={{ cursor: "pointer" }}
              >
                {icons.popupclose}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="parent d-flex border-1 justify-content-between bg-white hoverControl rounded-2 m-1 p-2"
            onClick={() =>
              handleAddList(
                cardsName === "Add New List" ? "listAdd" : "taskAdd"
              )
            }
            // name={cardsName === "Add New List" ? "listAdd" :"taskAdd"}
          >
            <div className="description-parent">
              {cardsName === "Add New List" ? "Add New List " : "Add Your task"}
            </div>
            <div>{icon}</div>
          </div>
        )}
      </Card> */}
    </div>
  );
};
