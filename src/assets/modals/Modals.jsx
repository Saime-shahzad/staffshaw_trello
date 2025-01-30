import React, { useEffect, useRef, useState } from "react";
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
import { getUsers } from "../../redux-store/users/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addCardMember,
  updateCardsData,
} from "../../redux-store/cardsSlice/cardsSlice";
const Modals = ({
  isModalOpen,
  setIsModalOpen,
  imageData,
  content,
  cardName,
  body,
  title,
}) => {
  const [isLoader, setIsLoader] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();
  const getusersData = useSelector((state) => state.user?.user);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const inputValue = useRef(null);
  let userDetailObj = {
    userName: "",
    userPassword: "",
    userEmail: "",
  };
  const handleInputValue = (e) => {
    console.log("e>>>", e.currentTarget);
    if (e.currentTarget.type === "Enter Name") {
      userDetailObj = { ...e, userName: e.currentTarget?.value };
      return userDetailObj;
    }
  };

  const handleOk = async () => {
    const getValue = inputValue?.current?.input?.value;
    const getValue2 = inputValue?.current.resizableTextArea.textArea.value;
    if (getValue) {
      setIsLoader(true);
      setTimeout(() => {
        setIsLoader(false);
        setIsModalOpen(false);
        toast.success(<div> &nbsp; Successfully Send </div>);
      }, 3000);
    } else if (getValue2 ) {
      const userData = {
        cardId: content?.id,
        card_description: getValue2,
      };

      const response = await dispatch(updateCardsData(userData));
      console.log("response>>>>", response);

      // setIsLoader(true);

      // setTimeout(() => {
      //   setIsLoader(false);
      //   setIsModalOpen(false);
      //   toast.success(<div> &nbsp; Successfully Send </div>);
      // }, 3000);

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
        cardId: content?.id,
        member_id: member_id,
      };
      // setIsLoader(true);
      const response = await dispatch(addCardMember(userData));
      console.log("response>>>>", response);

      // setTimeout(() => {
      //   setIsLoader(false);
      //   setIsModalOpen(false);
      //   toast.success(<div> &nbsp; Successfully Send </div>);
      // }, 3000);
    }

    setSelectedUsers((prevSelectedUsers) => {
      if (!prevSelectedUsers.includes(item?.full_name)) {
        return [...prevSelectedUsers, item?.full_name];
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
      component: <ModalPopups onClick={getSelectedValue} data={getusersData} />,
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

  return (
    <>
      <div className="modal-parrent-div">
        <Modal
          title={
            title ? (
              title
            ) : (
              <div>
                <div>{title || cardName}</div>
                <div style={{ fontSize: "14px", color: "gray" }}>
                  {content?.title}
                </div>
              </div>
            )
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={600}
          okButtonProps={{ style: { backgroundColor: "#172b4d" } }}

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
                          <TextArea
                            ref={inputValue}
                            placeholder="Make your Description even better with details"
                            className="textArea-control"
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
                        <div>
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
                                  {item?.split("")[0]}{" "}
                                </span>{" "}
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    content?.title
                  )}
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};
export default Modals;
