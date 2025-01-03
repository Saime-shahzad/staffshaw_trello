import React, { useEffect, useState } from "react";

import { Layout, Popover } from "antd";
import colors from "../../assets/colors/color";
import "./Index.css";
import icons from "../../assets/icons";
import Popup from "../../assets/select/Popup";
import { FilterComp } from "../../assets/others/Others";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getBoardList } from "../../redux-store/bordCards/boardCardsSlice";

import AppRoutes from "../../routes/index";
import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { getDashboardData } from "../../redux-store/globalSlice/globalSlice";
import { CardsSection } from "../../components/cardsSection/CardsSection";

// import {Inputs} from "../../assets/input/Inputs"
// import DraggableComponent from "../../components/dragAndDrop/DraggableComponent";

const { Content, Sider } = Layout;

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  // ya bhi baad ka liye roki ha state
  const [isBoardId, setIsBoardId] = useState(null);
  const [isBoardName, setIsBoardName] = useState({});
  console.log("isBoardName>>>>", isBoardName);

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const location = useLocation();
  const dispatch = useDispatch();
  // const routeTo=useRoutFunction()
  const navigate = useNavigate();

  const getBoardCardsNames = useSelector(
    (state) => state.boardCards?.boardCards
  );
  const getAdminDashboardData = useSelector(
    (state) => state.globalData?.dashboardData
  );
  

  const dynamicSideBarItems = [
    {
      id: "1",
      title: "Add Your WorkSpace",
      link: "/add-board",
      icons: icons.appStoreOutlined,
    },
    {
      id: "2",
      title: "Users",
      link: "/users",
      icons: icons.peopleGroupIcon,
    },
    ...getAdminDashboardData.map((item) => ({
      key: "sub1",
      label: item.name,
      icon: <SettingOutlined />,
      children: item.boards?.map((item) => ({
        key: item.id,
        label: item.title,
      })),
    })),
  ];

  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(getBoardList());
  }, [dispatch, isBoardId]);
  useEffect(() => {
    if (getAdminDashboardData && location.pathname === "/board") {
      //  setIsIdLocalstorage( localStorage.getItem("b-id"))
      const clickedItem2 =
        getAdminDashboardData &&
        getAdminDashboardData.flatMap((item) => {
          return item.boards?.filter(
            (item) => String(item.id) === localStorage.getItem("b-id")
          );
        });
  console.log("clickedItem2>>>>", clickedItem2);

      //  const clickedItem =
      //  getBoardCardsNames &&
      //  getBoardCardsNames.find((item) => String(item.id) === localStorage.getItem("b-id"));
      setIsBoardName(clickedItem2[0]);
    }
  }, [location.pathname, getAdminDashboardData]);

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
      setIsBoardId(clickedItem2[0].id);
      localStorage.setItem("b-id", clickedItem2[0].id);
      navigate("/board", { state: clickedItem2[0].id });
      setIsBoardName(clickedItem2[0] && clickedItem2[0]);
    }

    // else {

    //   setTimeout(() => {
    //     const clickedItem =
    //     getBoardCardsNames &&
    //     getBoardCardsNames.find((item) => String(item.id) === clickedItemKey);
    //     console.log("clickedItem>>>", clickedItem);

    //     if (clickedItem) {
    //       setIsBoardId(clickedItem.id);
    //       navigate("/", { state: clickedItem.id });
    //     }
    //   }, 100); // Ensure routing is complete
    // }
  };

  return (
    <Layout
      style={{
        minHeight: "80vh",
        backgroundColor: colors.theme,
      }}
    >
      <Sider
        width={!collapsed ? "250" : "20"}
        collapsed={collapsed}
        className="borderClass"
        style={{ background: colors.darkTheme }}
      >
        <div className="demo-logo-vertical" />
        <div className="sidebar-options  ">
          {!collapsed ? (
            <div className="parrent">
              <div className="menueClass d-flex ">
                <div class="BVceZHOoUszsgw r6KV0yEdmnh3Op">S</div>

                <div className=" text-white text-class  my-1 px-2 d-flex ">
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Staffshaw Workspace <br />
                    free
                  </Link>

                  <div
                    className="m-1 my-3 cursor-pointer"
                    onClick={(value) => setCollapsed(value)}
                  >
                    {icons.sidebarclose}
                  </div>
                </div>
              </div>
              {dynamicSideBarItems?.map((item) => {
                return (
                  <>
                    {item.key === "sub1" ? (
                      <Menu
                        onClick={(e) => onMenueClick(e)}
                        className=" custom-menu"
                        style={{
                          width: "100%",
                          //  backgroundColor:colors.darkTheme
                        }}
                        mode="inline"
                        items={[item]}
                      />
                    ) : (
                      <Link to={item.link} className="text-decoration-none">
                        <div
                          className="addworkSpace-parrent border-0 mt-1  "
                          style={{ cursor: "pointer" }}
                        >
                          <div className=" d-flex ">
                            <div
                              className="m-1 my-2  text-white  "
                              // onClick={(value) => setCollapsed(value)}
                            >
                              {item.icon}
                            </div>
                            <div className=" text-white align-items-center  my-1 px-2 d-flex ">
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </>
                );
              })}
            </div>
          ) : (
            <div
              className="m-1  my-3 d-flex position-relative justify-content-end  text-white cursor-pointer"
              style={{ cursor: "pointer", left: "10px" }}
              onClick={(value) => setCollapsed(!value)}
            >
              {icons.sidebarOpen}
            </div>
          )}
        </div>
      </Sider>
      <Layout>
        <div
          style={{
            padding: 16,

            color: "white",
            background: colors.theme,
          }}
        >
          <div className="headesss d-flex justify-content-between">
            <div className="fs-6 fw-bolder ">
              <span className="p-2 styleButton">
                {location.pathname === "/board"
                  ? isBoardName?.title
                  : "Select Bord"}
              </span>
              <span className=" mx-1 p-2 text-white styleButton">
                {icons.starIcon}
              </span>
              <span className=" mx-1 p-2 text-white styleButton">
                {icons.peopleGroupIcon}
              </span>
              <span className=" mx-1 text-white p-2 rounded-1   styleButton">
                <span>
                  <span className="mx-2">
                    <Popover
                      className=""
                      content={getBoardCardsNames?.map((item) => {
                        return (
                          <div className="controlHoverEffect ">
                            <div
                              key={item.id}
                              onClick={(e) => onMenueClick(e, item.id)}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {item.title}{" "}
                            </div>
                          </div>
                        );
                      })}
                      trigger="click"
                      open={open}
                      onOpenChange={handleOpenChange}
                    >
                      {icons.listIcon} Boards <span>{icons.downIcon}</span>
                    </Popover>
                  </span>
                </span>
              </span>
            </div>
            <div className="filter-Section">
              <div className="filterBox text-white d-flex p-1 px-2 justify-content-between   styleButton">
                <div className="filterIcon mx-2 ">
                  <Popup
                    title="Filters"
                    className="text-white bg-body p-0 bg-transparent border-0"
                    icon={icons.filterIcon}
                    component={<FilterComp icon={icons.peopleGroupIcon} />}
                  />
                </div>
                <div className="filterTittle fw-bolder">Filter</div>
              </div>
            </div>
          </div>{" "}
        </div>
        <Content
          style={{
            backgroundColor: colors.theme,
            width: "auto",
            overflow: "auto",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "100vh", // Full viewport height
              width: location.pathname === "/bord" ? "100%" : "100%",
              overflow: "scroll",
              // background: colors.theme,
              backgroundSize: "cover",
            }}
          >
            {/* <Routes>
              <Route path="/" element={<CardsSection />} />
              <Route path="/add-board" element={<NewBoard />} />
            </Routes> */}
            <AppRoutes />

            {/* <CardsSection />
            <NewBoard /> */}
            {/* <DraggableComponent  /> */}
          </div>
        </Content>
        <div className="d-none">

        {isBoardName ? <CardsSection workspace_id={isBoardName?.workspace_id} dataArray1={isBoardName } /> : ""}
        </div>
      </Layout>
    </Layout>
  );
};
export default Index;
