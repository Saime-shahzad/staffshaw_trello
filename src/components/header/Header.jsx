import React, { useState } from "react";
import icons from "../../assets/icons";
import colors from "../../assets/colors/color";
import "./Header.css";
import Input from "antd/es/input/Input";
import Popup from "../../assets/select/Popup";
import { NotifactionComp, Others } from "../../assets/others/Others";
import { Popover } from "antd";
import { useRoutFunction } from "../../assets/usefulFunctions/UseFullFunctions";

export const Header = () => {

  const [open, setOpen] = useState(false);
  const routeTo=useRoutFunction()
 
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
 


  const projectsNames = [
    {
        projectName: "First-Project",
    },
    {
        projectName: "Second-Project",
    },
   
  ];

  const getLastIndexs=projectsNames.slice(-2)
  console.log("getLastIndexs>>>", getLastIndexs);
  
  const headerItems = [
    {
      id: "1",
      title: `CRM`,
      // title:`logo${<CodepenOutlined />}`
    },
    {
      id: "2",
      title: "Work Space",
      header:"Current-WorkSpace",
      component: projectsNames?.map((item) => {
        return (
            <Others  items={item.projectName}  />
        
        );
      }),
    },
    {
      id: "3",
      title: "Recent",
      component:getLastIndexs?.map((item) => {
        return (
            <Others  items={item.projectName} icon={icons.starIcon}/>

       
        );
      }),
    },
    {
      id: "4",
      title: "Starred",
      //getLastIndexs its should be change by the starred array when api connect
      component:getLastIndexs?.map((item) => {
        return (
            <Others  items={item.projectName} icon={true}/>

       
        );
      }),
    },
    {
      id: "5",
      title: "More",
      component:<Others  items="Tampletes" icon={icons.templeteIcons}/>

    },
    {
      id: "6",
      title: "",
    },
  ];
  return (
    <div
      className="parrent-header d-flex justify-content-between"
      style={{ backgroundColor: colors.theme }}
    >
      <div className="d-flex  p-2">
        {headerItems?.map((item, index) => {
          return (
            <div className="header-ItemsParrent px-2 d-flex fw-bold ">
              {item.title === "CRM" ? (
                <div
                  className="text-white   fs-5 rounded-2 styleButton"
                  key={index}
                >
                  {icons.codePenIcon} {item.title}
                </div>
              ) : (
                <div
                  className="text-white p-1 fontSizeClass rounded-2 styleButton"
                  key={index}
                >
                  {item.title}{" "}
                  {!item.title ? (
                    icons.plusOutlineIcon
                  ) : (
                    <Popup title={item.header} className='text-white bg-body p-0 bg-transparent border-0' icon={icons.downIcon} component={item.component} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="search-Section p-2 d-flex">
        <div className="searchDiv">
          <Input
            placeholder="Search Your Projects"
            className="inputControl"
            value="Search"
            prefix={icons.searchIcon}
          />
        </div>
        <div className="notificationParrent mx-3 fs-5"
          style={{  cursor: "pointer" }}
          
          >
           {/* <Others items="Notification" icon={icons.notificationIcon}   /> */}
           <Popup title="Notification"  icon={icons.notificationIcon} className='text-white bg-body p-0 bg-transparent border-0' component={<NotifactionComp icon={icons.notificationIcon} />} />

          {/* {icons.notificationIcon} */}
        </div>
        {/* open if needed */}
        {/* <div className="notificationParrent mx-1 fs-5 ">
          {icons.questionMarkIcon}
        </div> */}
        <div
          className="profileNameParrent  bg-info rounded-5 mx-2 d-flex align-items-center p-1 mt-1  "
          style={{ fontSize: "12px", height: "23px", cursor: "pointer" }}
        >
              <Popover
      content={<div>
        <div 
        onClick={() => {routeTo("/sign-in")}}
        style={{
          cursor:"pointer"
        }}>
          Login </div>
         <div 
          onClick={() => {routeTo("/sign-up") 
            setOpen(false)
          }}
        style={{
          cursor:"pointer"
        }}>
          Register </div>
      </div>}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
     
          Ma
    </Popover>
        </div>
      </div>
    </div>
  );
};
