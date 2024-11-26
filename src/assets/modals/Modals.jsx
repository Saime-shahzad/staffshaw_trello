import React, { useRef, useState } from "react";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import ImageDragDrop from "../imagedragdrop/ImageDragDrop";
import icons from "../icons";
import "./Modals.css";
import Popup from "../select/Popup";
import { ModalPopups } from "../others/Others";
import colors from "../colors/color";
import { Inputs } from "../input/Inputs";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
const Modals = ({ 
  isModalOpen,
   setIsModalOpen, 
  //  imageData,
    body, 
    title }) => {
  const [isLoader , setIsLoader]=useState(false)

  const inputValue = useRef(null);
  let userDetailObj={
    userName: "",
    userPassword : "",
    userEmail: "",
  }
  const handleInputValue=((e) =>{
console.log("e>>>", e.currentTarget);
if(e.currentTarget.type==="Enter Name"){

  userDetailObj={...e , userName:e.currentTarget?.value}
  return userDetailObj
}
console.log("userDetailObj>>>inner", userDetailObj);
  })
console.log("userDetailObj>>>outer", userDetailObj);

  const handleOk = () => {
    
    const getValue = inputValue?.current?.input?.value;
    // const getValue = inputValue?.current.resizableTextArea.textArea.value;
    console.log("getValue>>", getValue);
    if(getValue){
      setIsLoader(true)
      setTimeout(() => {
        setIsLoader(false)
        setIsModalOpen(false);
  toast.success(<div> &nbsp; Successfully Send </div>)

      }, 3000);
    }
    else{
      toast.error(<div> &nbsp; empty User </div>)
    }
    
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const labelData = [
    {
      lableName: "Label",
      lables: colors.labelColor1,
    },
    {
      lableName: "Label",
      lables: colors.labelColor2,
    },
    {
      lableName: "Label",
      lables: colors.labelColor3,
    },
  ];
  const usersData = [
    {
      userName: "User 1",
      userId: 1,
    },
    {
      userName: "User 2",
      userId: 2,
    },
    {
      userName: "User 3",
      userId: 3,
    },
  ];

  const modalTabs = [
    {
      tabName: "Members",
      tabIcons: icons.peopleGroupIcon,
      component: <ModalPopups data={usersData} />,
    },
    {
      tabName: "Labels",
      tabIcons: icons.labelIcons,
      component: <ModalPopups data={labelData} />,
    },
    {
      tabName: "Attachments",
      tabIcons: icons.fileUploadIcons,
      component: <ImageDragDrop />,
    },
  ];
  return (
    <>
      <div className="modal-parrent-div">
        <Modal
          title={title ? title : "Task Detsils"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={600}
          okButtonProps={{ style: { backgroundColor: "#172b4d" } }}

          //   style={{backgroundColor:colors.ModalColor}}
        >{ isLoader ? <Loader /> : 
        
          <div>
          {title ? (
             <div>
              {body?.map((item) =>{
                return(


                <div className="p-1">
                  <label>
                    {item.label}
                  </label>
                  <Inputs onChange={(e) => handleInputValue(e)} ref={inputValue} type={item.type} placeholder={item.placeholder} />
                </div>
                )
              })}
               
             </div>
           ) : (
             <div className="first-div d-flex w-100 justify-content-between">
               <div className="detail-description">
                 <div className="description-Heading fw-bold">Description</div>
 
                 <div className="detail-Input-Description">
                   <TextArea
                     ref={inputValue}
                     placeholder="Make your Description even better with details"
                     className="textArea-control "
                     autoSize={{ minRows: 3, maxRows: 5 }}
                   />
                   <ImageDragDrop />
                 </div>
               </div>
               <div className="addToCard-Parrent  w-25">
                 <div className="addToCardFunctionality  fw-bold px-2  ">
                   Add to Card
                 </div>
                 {modalTabs?.map((items) => {
                   return (
                     <div className="mt-1">
                       <div className="tab-Parrent d-flex   ">
                         <div
                           className="notificationParrent  fs-5"
                           style={{ cursor: "pointer" }}
                         >
                           {/* <Others items="Notification" icon={icons.notificationIcon}   /> */}
                           <Popup
                             title={items.tabName}
                             className="border-0 bg-transparent text-dark-emphasis"
                             component={items.component}
                             icon={items.tabIcons}
                           />
 
                           {/* {icons.notificationIcon} */}
                         </div>
 
                         {/* <span>{items.tabIcons}</span> */}
                         <div className="mx-1">{items.tabName}</div>
                       </div>
                     </div>
                   );
                 })}
                 
               </div>
             </div>
           )}
           </div>
        }
        
        </Modal>
      </div>
    </>
  );
};
export default Modals;
