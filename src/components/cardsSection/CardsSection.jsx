import React, { useEffect, useState } from "react";
import { Cards } from "../../assets/cards/Cards";
import icons from "../../assets/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getListAgainstBoards } from "../../redux-store/bordCards/boardCardsSlice";
import { useLocation } from "react-router-dom";

export const CardsSection = ({ getBoardId, dataArray1, workspace_id }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isDatas, setIsDatas] = useState([]);
  const [isRefresh, setIsRefresh] = useState(null);
  const pageLocation = location.pathname === "/";

  // const getBoardCardsNames = useSelector(
  //   (state) => state.boardCards?.boardCards
  // );
  // const getListsNameAgainstCards = useSelector(
  //   (state) => state.boardCards?.listAgainstBoards
  // );
  // console.log("getListsNameAgainstCards>>>>", getListsNameAgainstCards);

  console.log("dataArray1 top pr>>>>", dataArray1);

  const addListOption = [
    {
      id: 11111,
      title: "Add New List",
      cards: [],
    },
  ];
  useEffect(() => {
    if (dataArray1?.lists) {
      const updatedListOfCardNames = [
        ...(Array.isArray(dataArray1.lists) ? dataArray1?.lists : []),
        ...addListOption,
      ];
      setIsDatas(
        updatedListOfCardNames.length > 1 ? updatedListOfCardNames : []
      );
    }
  }, [dataArray1]);
  console.log("dataArray1>>>>", dataArray1);
  console.log("isDatas>>>>", isDatas);

  useEffect(() => {
    if (isDatas.length) {
      setIsRefresh((prev) => !prev);
    }
  }, [isDatas, dataArray1]);

  // const updatedListOfCardNames = [
  //   ...(Array.isArray(getListsNameAgainstCards)
  //     ? getListsNameAgainstCards
  //     : []),
  //   ...addListOption,
  // ];
  // useEffect(() => {
  //   dispatch(getListAgainstBoards(getBoardId));
  // }, [dispatch, getBoardId]);

  // const cardArray = [
  //   {
  //     cardId: 1,
  //     cardName: "To do",
  //   },
  //   {
  //     cardId: 2,

  //     cardName: "card2",
  //   },
  //   {
  //     cardId: 3,

  //     cardName: "card3",
  //   },
  //   {
  //     cardId: 4,

  //     cardName: "Add Card",
  //   },
  // ];
  const dataArray = [
    {
      description: "task Description",
      taskId: "1",
    },
    {
      description: "task Description",
      taskId: "2",
    },
    {
      description: "task Description here you define",
      taskId: "3",
    },
  ];
  // const addCard = [
  //   {
  //     description: "task Description",
  //   },
  // ];

  return (
    <div className="card-Parrent">
      {[1 , 2 , 3].map((item) => {
        return(
          <div>
            {item}
          </div>
        )
      })}
      {isDatas?.map((item) => {
        return(
          <div>
            {item.id}
          </div>
        )
      })}
      <div className="card1 d-flex justify-content-between">
        {
          isDatas?.map((items, index) => {
            console.log("inside content?", items);
            

            return (
              <div>
                {index}
              </div>
              // <Cards
              //   // data={items?.cards ? items?.cards :[]}
              //   id={new Date().getMilliseconds()*index}
              //   data={items.cards}
              //   cardsName={items.title}
              //   cardKey={items.id}
              //   cardlistId={items.id}
              //   cardId={workspace_id}
              //   icon={icons.editIcon}
              // />
            );
          })
          //  {isDatas?.map((items, index) => {
          //     console.log("items?????", items);

          //     return (
          //       <Cards
          //         // data={items?.cards ? items?.cards :[]}
          //         data={items.cards}
          //         cardsName={items.title}
          //         cardKey={items.id}
          //         cardlistId={items.id}
          //         cardId={workspace_id}
          //         icon={icons.editIcon}
          //       />
          //     );
          //   })

          // : (
          //   <div className="w-100 ">
          //     <div className=" w-100 h-100  d-flex bg-white justify-content-center align-items-center">
          //       Please Select your Board To Proceed..
          //     </div>
          //   </div>
        }
      </div>
    </div>
  );
};
