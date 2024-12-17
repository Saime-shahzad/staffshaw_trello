import React, { useEffect } from "react";
import { Cards } from "../../assets/cards/Cards";
import icons from "../../assets/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getListAgainstBoards } from "../../redux-store/bordCards/boardCardsSlice";
import { useLocation } from "react-router-dom";

export const CardsSection = ({ getBoardId }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pageLocation = location.pathname === "/";

  // const getBoardCardsNames = useSelector(
  //   (state) => state.boardCards?.boardCards
  // );
  const getListsNameAgainstCards = useSelector(
    (state) => state.boardCards?.listAgainstBoards
  );
  const addListOption = [
    {
      id: 1,
      title: "Add New List",
    },
  ];
  const updatedListOfCardNames = [
    ...(Array.isArray(getListsNameAgainstCards)
      ? getListsNameAgainstCards
      : []),
    ...addListOption,
  ];
  useEffect(() => {
    dispatch(getListAgainstBoards(getBoardId));
  }, [dispatch, getBoardId]);

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
      <div className="card1 d-flex justify-content-between">
        {!pageLocation && updatedListOfCardNames ? (
          updatedListOfCardNames?.map((items, index) => {
            return (
              <Cards
                data={dataArray}
                cardsName={items.title}
                cardKey={index}
                cardlistId={items.id}
                cardId={getBoardId}
                icon={icons.editIcon}
              />
            );
          })
        ) : (
          <div className="w-100 ">
            <div className=" w-100 h-100  d-flex bg-white justify-content-center align-items-center">
              Please Select your Board To Proceed
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
