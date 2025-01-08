import React, { useCallback, useEffect, useRef, useState } from "react";
import { Cards } from "../../assets/cards/Cards";
import icons from "../../assets/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getListAgainstBoards } from "../../redux-store/bordCards/boardCardsSlice";
import { useLocation } from "react-router-dom";

const dummyData = [
  {
    id: 1,
    data: [
      {
        id: 12,
        taskId: 1232,
        title: "abc1",
      },
      {
        id: 13,
        taskId: 1232,
        title: "abc2",
      },
      {
        id: 12,
        taskId: 1232,
        title: "abc3",
      },
      {
        id: 12,
        taskId: 1232,
        title: "abc4",
      },
    ],
    cardsName: "{items.title}",
    cardKey: "{items.id}",
    cardlistId: "{items.id}",
    cardId: "{workspace_id}",
    icon: "{icons.editIcon}",
  },
];

const dummyDataV1 = [
  {
    id: 1,
    title: "To Do",
    position: "1",
    cards: [
      {
        id: 12,
        taskId: 1232,
        title: "abc1",
      },
      {
        id: 13,
        taskId: 1232,
        title: "abc2",
      },
      {
        id: 12,
        taskId: 1232,
        title: "abc3",
      },
      {
        id: 12,
        taskId: 1232,
        title: "abc4",
      },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    position: "2",
    cards: [],
  },
  {
    id: 3,
    title: "Done",
    position: "3",
    cards: [],
  },
  {
    id: 11111,
    title: "Add New List",
    cards: [],
  },
];

const addListOption = [
  {
    id: 11111,
    title: "Add New List",
    cards: [],
  },
];

export const CardsSection = ({
  getBoardId,
  dataArray1,
  workspace_id,
  list,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isDatas, setIsDatas] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(null);
  const pageLocation = location.pathname === "/";

  const prevBoardData = useRef();

  console.log("list >>>", list);
  // console.log("boardData >>>", boardData);
  // console.log("isDatas >>>", isDatas);

  useEffect(() => {
    // console.log("boardData changed:", JSON.stringify(boardData));
    setIsRefresh((prev) => !prev);
  }, [boardData]);

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

  return (
    <div className="card-Parrent">
      {Array.isArray(list) ? (
        list?.map((item) => {
          // console.log("Rendering item >>>", item);

          return (
            <div key={item.id}>
              <h3>Title: {item.title}</h3>
              <p>Position: {item.position}</p>
              <p>Cards: {item.cards.length}</p>
            </div>
          );
        })
      ) : (
        <div>No valid board data available</div>
      )}
    </div>
  );
  // return (
  //   <div className="card-Parrent">
  //     <div className="card1 d-flex justify-content-between">
  //       {
  //         isDatas?.map((items, index) => {
  //           console.log("inside content?", items);

  //           return (
  //             <div>{index}</div>
  //             // <Cards
  //             //   // data={items?.cards ? items?.cards :[]}
  //             //   id={new Date().getMilliseconds()*index}
  //             //   data={items.cards}
  //             //   cardsName={items.title}
  //             //   cardKey={items.id}
  //             //   cardlistId={items.id}
  //             //   cardId={workspace_id}
  //             //   icon={icons.editIcon}
  //             // />
  //           );
  //         })
  //         //  {isDatas?.map((items, index) => {
  //         //     console.log("items?????", items);

  //         //     return (
  //         //       <Cards
  //         //         // data={items?.cards ? items?.cards :[]}
  //         //         data={items.cards}
  //         //         cardsName={items.title}
  //         //         cardKey={items.id}
  //         //         cardlistId={items.id}
  //         //         cardId={workspace_id}
  //         //         icon={icons.editIcon}
  //         //       />
  //         //     );
  //         //   })

  //         // : (
  //           // <div className="w-100 ">
  //           //   <div className=" w-100 h-100  d-flex bg-white justify-content-center align-items-center">
  //           //     Please Select your Board To Proceed..
  //           //   </div>
  //           // </div>
  //       }
  //     </div>
  //   </div>
  // );
};
