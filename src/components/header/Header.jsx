import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";
import colors from "../../assets/colors/color";
import "./Header.css";
import Input from "antd/es/input/Input";
import Popup from "../../assets/select/Popup";
import { NotifactionComp, Others } from "../../assets/others/Others";
import { Popover } from "antd";
import { useRoutFunction } from "../../assets/usefulFunctions/UseFullFunctions";
import { useDispatch } from "react-redux";
import {
  getDashboardData,
  getWorkspaces,
} from "../../redux-store/globalSlice/globalSlice";
import { useSelector } from "react-redux";
import { CardsSection } from "../cardsSection/CardsSection";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [isBoardName, setIsBoardName] = useState({});

  const routeTo = useRoutFunction();
  const dispatch = useDispatch();

  const getWorkspacesData = useSelector(
    (state) => state.globalData?.workspaceData
  );
  const getAdminDashboardData = useSelector(
    (state) => state.globalData?.dashboardData
  );
  console.log("getAdminDashboardData>>" , getAdminDashboardData);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if(!localStorage.getItem("role")?.includes("user")){

      dispatch(getWorkspaces());
    }
    dispatch(getDashboardData());
  }, [dispatch, isBoardName]);

  const projectsNames = [
    {
      projectName: "First-Project",
    },
    {
      projectName: "Second-Project",
    },
  ];
  const localItems = localStorage.getItem("token");

  const getLastIndexs = projectsNames.slice(-2);

  const headerItems = [
    {
      id: "1",
      title: `CRM`,
      // title:`logo${<CodepenOutlined />}`
    },
    {
      id: "2",
      title: "Work Space",
      header: "Current-WorkSpace",
      component: getWorkspacesData?.map((item) => {
        return (
          <Others onClick={(e) => onMenueClick(e, item.id)} items={item.name} />
        );
      }),
    },
    {
      id: "3",
      title: "Recent",
      component: getLastIndexs?.map((item) => {
        return <Others items={item.projectName} icon={icons.starIcon} />;
      }),
    },
    {
      id: "4",
      title: "Starred",
      //getLastIndexs its should be change by the starred array when api connect
      component: getLastIndexs?.map((item) => {
        return <Others items={item.projectName} icon={true} />;
      }),
    },
    {
      id: "5",
      title: "More",
      component: <Others items="Tampletes" icon={icons.templeteIcons} />,
    },
    {
      id: "6",
      title: "",
    },
  ];
  const onMenueClick = async (e, id) => {
    if (e.preventDefault) {
      e.preventDefault(); // Prevents any default behavior, if applicable
    }

    const clickedItemKey = id ? String(id) : e.key;

    const clickedItem2 =
      getAdminDashboardData &&
      getAdminDashboardData.flatMap((item) => {
        return item.boards?.filter(
          (list) => String(list.id) === clickedItemKey
        );
      });

    if (clickedItem2[0]) {
      localStorage.setItem("b-id", clickedItem2[0].id);
      routeTo("/");
      setIsBoardName(clickedItem2[0] && clickedItem2[0]);
    }
  };
  return (
    <div
      className="parrent-header d-flex justify-content-between"
      style={{ background: colors.theme }}
    >
      <div className="d-flex  p-2">
        {(Array.isArray(getAdminDashboardData) && getAdminDashboardData.length > 0) && headerItems?.map((item, index) => {
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
                    <Popup
                      title={item.header}
                      className="text-white bg-body p-0 bg-transparent border-0"
                      icon={icons.downIcon}
                      component={item.component}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="search-Section p-2 d-flex">
      {(Array.isArray(getAdminDashboardData) && getAdminDashboardData.length > 0) ?
      <>
        <div className="searchDiv">
          <Input
            placeholder="Search Your Projects"
            className=" text-white"
            style={{ background: colors.theme }}
            value="Search"
            prefix={icons.searchIcon}
          />
        </div>
        <div
          className="notificationParrent  mx-3 fs-5"
          style={{ cursor: "pointer" }}
        >
          {/* <Others items="Notification" icon={icons.notificationIcon}   /> */}
          <Popup
            title="Notification"
            icon={icons.notificationIcon}
            className="text-white bg-body p-0 bg-transparent border-0"
            component={<NotifactionComp icon={icons.notificationIcon} />}
          />

          {/* {icons.notificationIcon} */}
        </div>
        </>
        :
        ""
        
        
        }
        {/* open if needed */}
        {/* <div className="notificationParrent mx-1 fs-5 ">
          {icons.questionMarkIcon}
        </div> */}
        <div
          className="profileNameParrent  bg-info rounded-5 mx-2 d-flex align-items-center p-1 mt-1  "
          style={{ fontSize: "12px", height: "23px", cursor: "pointer" }}
        >
          <Popover
            overlayInnerStyle={{
              inset: "43px auto auto 810px", // Example inset adjustment
            }}
            arrowPointAtCenter
            placement="topLeft"
            content={
              <div>
                <div
                  onClick={() => {
                    routeTo("/sign-in");
                  }}
                  style={{
                    cursor: "pointer",
                    display: localItems && "none",
                  }}
                >
                  Login{" "}
                </div>
                <div
                  onClick={() => {
                    routeTo("/sign-up");
                    setOpen(false);
                  }}
                  style={{
                    cursor: "pointer",
                    display: localItems && "none",
                  }}
                >
                  Register{" "}
                </div>
                <div
                  onClick={() => {
                    routeTo("/profile");
                    setOpen(false);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Profile{" "}
                </div>
                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.assign("/sign-in");

                    setOpen(false);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Logout{" "}
                </div>
              </div>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            Ma
          </Popover>
        </div>
      </div>
      

      {/* for the ardSecction/// */}

      <div className="d-none">
        {isBoardName && (
          <CardsSection
            workspace_id={isBoardName?.workspace_id}
            dataArray1={isBoardName}
            boardId={localStorage.getItem("b-id")}
            list={isBoardName?.lists}
          />
        )}
      </div>
      {/* ////close/// */}
    </div>
  );
};
