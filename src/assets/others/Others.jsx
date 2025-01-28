import React, { useState } from "react";
import "./Others.css";
import Loader from "../loader/Loader";
import icons from "../icons";
import CheckBox from "../checkbox/CheckBox";

export const Others = ({ items, onClick,icon = false }) => {
    const [isOpenPop , setIsOpenPop]=useState(false)


const colorName=[
    {colorName:"color1"},
    {colorName:"color2"},
    {colorName:"color3"},
    {colorName:"color4"},
    {colorName:"color5"},
]
const handleTampletPopup= (()=>{

    setIsOpenPop(true) 

    

})


  return (
    <div className="popconfermContent" >
   { !isOpenPop && <div className=" popconfermContent hoverControl">
      <div
        className="projectNameParrent   w-100 d-flex"
        style={{ cursor: "pointer" }}
      >
        {!icon && items !=="Tampletes" ? (
          <div class="BVceZHOoUszsgw r6KV0yEdmnh3Op">S</div>
        ) : (icon && items ==="Tampletes"? ""
          
          :<div className="p-3 mt-2 rounded-2 bg-info  mx-2 mb-3">
            
          </div>
        )}

        <div className="projectName fw-bold p-1 pt-2 w-100">
          <span onClick={onClick}>

          {items}
          </span>
          <span
            className="d-block fw-light"
            style={{ fontSize: "12px", lineHeight: "2px" }}
          >
            {" "}
            workspace{" "}
          </span>
        </div>
        {icon ? (
          <div className="p-1 pt-2 rounded-2 control-hover text-black-50 mx-2 mb-3"
          
          onClick={handleTampletPopup}
          >
            {icon}
          </div>
        ) : ( 
          ""
        )}
      </div>
    </div>}
    
    {isOpenPop &&
    <div >
        <div className="hoverControl">
        <div className="boxHeade-Parrnt  d-flex justify-content-between  p-2 ">
        <div className="arrowParrent control-hover" onClick={() => setIsOpenPop(false)} style={{cursor:"pointer"}}>
        {icons.sidebarclose}
        </div>
        <div className="tittleParrent" >
        Tamplates
        </div>
        <div className="closeOconParrent control-hover" onClick={() => setIsOpenPop(false)} style={{cursor:"pointer"}}>
        {icons.popupclose}
        </div>
        </div>
        </div>
        {!colorName ?  <Loader /> : 
        colorName?.map((item) => {
            return(
                <div onClick={() => setIsOpenPop(false)} style={{cursor:"pointer"}} className="bg-info p-2 mt-1">
                    {item.colorName}
                    
                    
                    </div> 
            )
        })
}
        
    </div>
    
        
        
    }

  
    </div>
  );
};

export const NotifactionComp = ({  icon = false   }) => {

    const notifficationArray=[
        

        {Notifications:"1"},
        {Notifications:"2"},
        {Notifications:"3"},
    
]

return(
    <div className="parrent-Div">
        <div className="notificationBox-Parrent">
          {
            notifficationArray ? <div className=" ifNotNotifications" > 
        No Unread Notifications
            </div> :"dfsd"
          }
        </div>

    </div>
)

}
export const FilterComp = ({  icon = false   }) => {

    

return(
    <div className="parrent-Div">
        <div className="notificationBox-Parrent">
         <CheckBox label="Cards Assign to me" icon={icon} />
        </div>

    </div>
)

}
export const ModalPopups = ({  data  , onClick }) => {

    

return(
    <div className="parrent-Div">

      {data?.map((items) => {
        return(

          <div
          className="modalpopups-Parrent d-flex p-1 "
        >
          <div className="id-or-labelNames">
            {items.id ? items.id : items.lableName}
          </div>
          :
          <div
            className="popupdata-Parrent w-100 mx-1"
            // Pass `items` explicitly
            style={{ backgroundColor: items.lables ? items.lables : "" }}
          >
            {items.full_name ? (
              <div className="d-flex" >
                <CheckBox  onChange={() => onClick(items)} />{items.full_name}
              </div>
            ) : (
              items.lables
            )}
          </div>
        </div>
        
        )
      })}

    </div>
)

}