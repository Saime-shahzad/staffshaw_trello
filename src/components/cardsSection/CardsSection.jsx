import React, { useEffect, useRef, useState } from "react";
import { Cards } from "../../assets/cards/Cards";
import icons from "../../assets/icons";

const addListOption = [
  {
    id: 11111,
    title: "Add New List",
    cards: [],
  },
];

export const CardsSection = ({ dataArray1, workspace_id }) => {
  const [boardData, setBoardData] = useState([]);

  const prevBoardData = useRef();

  // console.log("boardData >>>", boardData);
  // console.log("isDatas >>>", isDatas);

  useEffect(() => {
    if (dataArray1?.lists) {
      let lists = dataArray1?.lists?.map((item) => item);
      const updatedListOfCardNames = [
        ...(Array.isArray(lists) ? lists : []),
        ...addListOption,
      ];
      // console.log("updatedListOfCardNames >>>", updatedListOfCardNames);
      setBoardData(
        prevBoardData.current
          ? [...prevBoardData.current, ...updatedListOfCardNames]
          : updatedListOfCardNames
      );
    }
  }, [dataArray1]);

  // console.log("Current boardData:", JSON.stringify(boardData));

  // return (
  //   <div className="card-Parrent">
  //     {Array.isArray(boardData) ? (
  //       boardData?.map((item) => {
  //         // console.log("Rendering item >>>", item);

  //         return (
  //           <div key={item.id}>
  //             <h3>Title: {item.title}</h3>
  //             <p>Position: {item.position}</p>
  //             <p>Cards: {item.cards.length}</p>
  //           </div>
  //         );
  //       })
  //     ) : (
  //       <div>No valid board data available</div>
  //     )}
  //   </div>
  // );
  return (
    <div className="card-Parrent">
      <div className="card1 d-flex justify-content-between">
        {boardData ? (
          boardData?.map((items, index) => {
            return (
              <Cards
                // data={items?.cards ? items?.cards :[]}
                id={index}
                data={items.cards}
                cardsName={items.title}
                cardKey={items.id}
                cardlistId={items.id}
                cardId={workspace_id}
                icon={icons.editIcon}
              />
            );
          })
        ) : (
          <div className="w-100 ">
            <div className=" w-100 h-100  d-flex bg-white justify-content-center align-items-center">
              Please Select your Board To Proceed..
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
