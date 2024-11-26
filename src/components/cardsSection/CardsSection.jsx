import React from "react";
import { Cards } from "../../assets/cards/Cards";
import icons from "../../assets/icons";


export const CardsSection = () => {
  const cardArray = [
    {
      cardId: 1,
      cardName: "To do",
    },
    {
      cardId: 2,

      cardName: "card2",
    },
    {
      cardId: 3,

      cardName: "card3",
    },
    {
      cardId: 4,

      cardName: "Add Card",
    },
  ];
  const dataArray = [
    {
      description: "task Description",
      taskId:"1"
    },
    {
      description: "task Description",
      taskId:"2"
    },
    {
      description: "task Description this is not enouigh to describe",
      taskId:"3"
    },
  ];
  const addCard = [
    {
      description: "task Description",
    },
   
  ];
  return (
    <div className="card-Parrent">
      <div className="card1 d-flex justify-content-between">
      
        {cardArray?.map((items)=>{
            return(

                <Cards data={items.cardName ==="Add Card" ? addCard :items.cardName=== "To do" ? dataArray:[]} cardsName={items.cardName} cardId={items.cardId}  icon={icons.editIcon} />
            )
        })}
         
      </div>
    </div>
  );
};
