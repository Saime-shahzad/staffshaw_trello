import React, {
  useEffect,
  //  useEffect, 
  useRef, useState } from "react";
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
// import { getUsers } from "../../redux-store/users/userSlice";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import {
  addCardComment,
  addCardMember,
  updateCardsData,
} from "../../redux-store/cardsSlice/cardsSlice";
import { Buttons } from "../button/Buttons";
const Modals = ({
  isModalOpen,
  setIsModalOpen,
  imageData,
  content,
  cardName,
  body,
  viewCardData,
  title,
}) => {
  const [isLoader, setIsLoader] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openTextField, setOpenTextField] = useState(false);
  const dispatch = useDispatch();
  // const getusersData = useSelector((state) => state.user?.user);
  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);

  const inputValue = useRef(null);
  let userDetailObj = {
    userName: "",
    userPassword: "",
    userEmail: "",
  };
  console.log("viewCardData >>>>" , viewCardData);
  
  const handleInputValue = (e) => {
    console.log("e>>>", e.currentTarget);
    if (e.currentTarget.type === "Enter Name") {
      userDetailObj = { ...e, userName: e.currentTarget?.value };
      return userDetailObj;
    }
  };
  useEffect(() => {
   if(viewCardData && viewCardData){
    setSelectedUsers(viewCardData?.members)
   }
  }, [viewCardData])
  

  const handleOk = async () => {
    const getValue = inputValue?.current?.input?.value;
    const getValue2 = inputValue?.current.resizableTextArea.textArea.value;
    if (getValue) {
      setIsLoader(true);
      setTimeout(() => {
        setIsLoader(false);
        setIsModalOpen(false);
        toast.success(<div> &nbsp; Successfully Added </div>);
      }, 3000);
    } else if (getValue2 ) {
      const userData = {
        cardId: viewCardData?.card?.id,
        card_description: getValue2,
      };

      setIsLoader(true);
      const response = await dispatch(updateCardsData(userData));

if(response?.payload?.status){

  setTimeout(() => {
    setIsLoader(false);
    setIsModalOpen(false);
    toast.success(<div> &nbsp; Successfully Updated </div>);
  }, 3000);
}
else{
  toast.error("Issues In Updating")
}

      /// kal say ma yahin say kaam start kronga
    } else {
      toast.error(<div> &nbsp; empty fields </div>);
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
  const getSelectedValue = async (item) => {
    console.log("Clicked item:", item);
    const member_id = item?.id;
    if (member_id) {
      const userData = {
        cardId: viewCardData?.card?.id,
        member_id: member_id,
      };
      setIsLoader(true);
      const response = await dispatch(addCardMember(userData));
      console.log("response>>>" , response);
      

      if(response?.payload?.status){
      
        setTimeout(() => {
          setIsLoader(false);
          setIsModalOpen(false);
          toast.success(<div> &nbsp; Successfully Updated </div>);
        }, 3000);
      }
      else{
        toast.error("Issues InUpdating ")
      }
    }

    setSelectedUsers((prevSelectedUsers) => {
      if (!prevSelectedUsers.includes(item?.full_name)) {
        return [...prevSelectedUsers,{full_name: item?.full_name}];
      }
      return prevSelectedUsers;
    });
    // Perform your desired logic here
  };
  // const getSelectedValue = (e) => {
  //   console.log("e.target.getAttribute" , e.target.getAttribute("value"));
  //   setSelectedUsers((prevSelectedUsers) => [
  //     ...prevSelectedUsers,
  //     e.target.getAttribute("value"),
  //   ]);
  // };

  const modalTabs = [
    {
      tabName: "Members",
      tabIcons: icons.peopleGroupIcon,
      component: <ModalPopups onClick={getSelectedValue} data={viewCardData?.allUsers} />,
    },
    {
      tabName: "Labels",
      tabIcons: icons.labelIcons,
      component: <ModalPopups onClick={getSelectedValue} data={labelData} />,
    },
    // {
    //   tabName: "Attachments",
    //   tabIcons: icons.fileUploadIcons,
    //   component: <ImageDragDrop />,
    // },
  ];
  //   const handleRemoveName=((e)=>{
  // console.log("e>>>", e.target.getAttribute("value"));

  //   })
  const isUser = localStorage.getItem("role")?.includes("user");
const handleComment=async () =>{
  const commentValue = inputValue?.current.resizableTextArea.textArea.value;
  if (commentValue) {
    const userData={
      userRole:isUser, 
      comment:commentValue,
      user_id:localStorage.getItem("userId"),
      cardId:viewCardData?.card?.id

    }
    
    const response = await dispatch(addCardComment(userData));
    console.log("ok>>>response" , response); 

    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
      // setIsModalOpen(false)
      toast.success(<div> &nbsp; Successfully Added </div>);
    }, 3000);
  }
  else{
    toast.warning("Invalid Comment")
  }
  
}
  return (
    <>
      <div className="modal-parrent-div">
        <Modal
          title={
            title ? (
              title
            ) : (
              <div>
                <div>{title || viewCardData?.card?.title}</div>
                {!isLoader && <div style={{ fontSize:  "14px" , color:  "gray"  }}>
                  {content?.title}
                </div>}
              </div>
            )
          }
          open={isModalOpen}
          // onOk={handleOk}
          onCancel={handleCancel}
          width={600}
          okButtonProps={{ style: { backgroundColor: "#172b4d" 
            , display:viewCardData?.card?.title || isUser ? "none" :"flex"
          } }
        
        }
        cancelButtonProps={{ style: { backgroundColor: "#172b4d" 
          , display:viewCardData?.card?.title || isUser ? "none" :"flex"
        } }}
        

          //   style={{backgroundColor:colors.ModalColor}}
        >
          {isLoader ? (
            <Loader />
          ) : (
            <div>
              {title ? (
                <div>
                  {body?.map((item) => {
                    return (
                      <div className="p-1">
                        <label>{item.label}</label>
                        <Inputs
                          onChange={(e) => handleInputValue(e)}
                          ref={inputValue}
                          type={item.type}
                          placeholder={item.placeholder}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="first-div d-flex w-100 justify-content-between">
                  {!isUser ? (
                    <>
                      <div className="detail-description w-100">
                        <div className="description-Heading fw-bold">
                          Add More Description
                        </div>

                        <div className="detail-Input-Description ">
                          {(viewCardData?.card?.description && !openTextField)? 
                        <div className="viewDescription-parent">
                          <div>

                          {viewCardData?.card?.description }
                            </div>
                            <div className="edit-description-button text-info" style={{cursor:"pointer"}} onClick={() => setOpenTextField(true)}>
                              Add More?
                            </div>
                          </div>  :

                            <div>
                           
                          <TextArea
                            ref={inputValue}
                            placeholder="Make your Description even better with details"
                            className="textArea-control"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                          <div className="buttons-parent d-flex pt-1">
                            <Buttons text="Cancel" className="bg-white "   onClick={() => setOpenTextField(false)} />
                            <Buttons text="Add" className="buttonstyle mx-2" onClick={handleOk}/>
                            </div>
                           </div>
                        }
                          <ImageDragDrop cardData={viewCardData} />

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
                                <div className="notificationParrent  fs-5">
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
                                {/* <div className="mx-1">{items.tabName}</div> */}
                              </div>
                            </div>
                          );
                        })}
                        <div className=" px-2">
                        <div style={{color:"#172b4d" , fontWeight:"bold"}}>
                        Assign To
                        
                      </div>
                          {selectedUsers?.map((item) => {
                            
                            return (
                              <div className="mt-1">
                                {/* <sup className="p-1 ronded-2 " value={item} onClick={(e) => handleRemoveName(e)} style={{backgroundColor:"lightgrey" , cursor:"pointer"}}>
                            {icons.popupclose}
                            </sup> */}
                                <span
                                  className=" rounded-circle bg-info mx-1 p-1"
                                  style={{ cursor: "pointer" }}
                                >
                                  {/* {item.full_name}{" "} */}
                                  {item?.full_name.split("")[0]}{" "}
                                </span>{" "}
                                {item.full_name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                    <div className="descriptionForUser-parent">
                      <div style={{color:"#172b4d" , fontWeight:"bold"}}>
                        Card Description
                      
                      </div>
                      <div>
                        {viewCardData?.card?.description}
                        </div>
                      </div>
                      
                      <div className="">
                      <div style={{color:"#172b4d" , fontWeight:"bold"}}>
                        Assign To
                        
                      </div>
                          { selectedUsers?.map((item) => {
                            
                            return (
                              <div className="mt-1">
                                {/* <sup className="p-1 ronded-2 " value={item} onClick={(e) => handleRemoveName(e)} style={{backgroundColor:"lightgrey" , cursor:"pointer"}}>
                            {icons.popupclose}
                            </sup> */}
                            
                                <span
                                  className=" rounded-circle bg-info mx-1 p-1"
                                  style={{ cursor: "pointer" }}
                                >
                                  {/* {item.full_name}{" "} */}
                                  {item?.full_name.split("")[0]}{" "}
                                </span>{" "}
                                {item.full_name}
                              </div>
                            );
                          })}
                        </div>
                      </>
                  )}
                
                </div>

              )}
              <div className="comment-section-parent">
                <span style={{color:"#172b4d" , fontWeight:"bold"}} >
                  Comments
                </span>
            <div className="text-areaa-parent">
              {viewCardData?.comments?.map((item) => {
                return(
                  <div className="bg-white rounded-2 my-2 w-50 p-3">
                    {item.comment}
                    <div className="text-end text-warning">
                      saime
                    </div>
                    </div>
                )
                
              })}

                  <TextArea className="w-50"
        placeholder="Comment"
        ref={inputValue}

        autoSize={{
          minRows: 2,
          maxRows: 6,
        }}

      />
      <div className="button-parent d-flex justify-content-end w-50 pt-2">
        <Buttons text="Send" onClick={handleComment} className="buttonstyle d-flex justify-con" />
      </div>
              </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};
export default Modals;
