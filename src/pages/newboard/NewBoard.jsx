import React, {
  useEffect,
  // useRef,
  useState,
} from "react";
import "./NewBoard.css";
import icons from "../../assets/icons";
// import {Inputs} from "../../assets/input/Inputs"
// import { Buttons } from "../../assets/button/Buttons";
// import Loader from "../../assets/loader/Loader";
import { toast } from "react-toastify";
import Forms from "../../assets/forms/Forms";
import { useDispatch } from "react-redux";
import { getDashboardData } from "../../redux-store/globalSlice/globalSlice";
import { useSelector } from "react-redux";
import { addBoard } from "../../redux-store/boards/boardSlice";

const NewBoard = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  // const inputRef = useRef(null);
  const getAdminDashboardData = useSelector(
    (state) => state.globalData?.dashboardData
  );
  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch ]);
  useEffect(() => {
   
  }, [refresh])
  

  const formContent = [
    {
      id: 1,
      label: "work Space",
      name: "workspace_name",
      type: "select",
      message: "work Space is Required",
      required: true,
      options: getAdminDashboardData?.map((item) => {
        return { value: item.id, label: item.name };
      }),
    },
    {
      id: 2,
      label: "Boards",
      name: "title",
      type: "text",
      message: "Board is Required",
      required: true,
    },
  ];
 const handleAddBoard = async (values) => {
  if (values.title && values.workspace_name) {
    setIsLoader(true);

    // Await the async thunk
    const response = await dispatch(addBoard(values));

    if (response?.payload?.message === "Board created successfully") {
      setTimeout(() => {
        setIsLoader(false);
        toast.success(<div> &nbsp; Successfully Added </div>);
        setRefresh((prev) => !prev);
      }, 3000);
    }
  } else {
    toast.error(<div> &nbsp; Empty Board</div>);
  }
};
  const onFinishFailed = (errorInfo) => {
    toast.error(<div> {errorInfo}</div>);
  };
  return (
    <div className="parrent-addBoard  ">
      <div className="header ">
        <div className="staffShaw-title  d-flex">
          <div class="S-class-1 S-class-2">S</div>
          <div className="h5 mx-2 pt-3">
            StaffShaw Workspace
            <div className="pt-1" style={{ fontSize: "11px" }}>
              <span className="pl-2"> Public </span>
              {icons.locakIcons}
            </div>
          </div>
        </div>
      </div>

      <div className="add-board-dection  mt-2">
        <div className="form p-3 row justify-content-center">
        
          <Forms
            formContent={formContent}
            formTitle="Add Board"
            buttonName="Add Board"
            multiple={false}
            onFinish={handleAddBoard}
            onFinishFailed={onFinishFailed}
            loading={isLoader}
          />
          <div className="button-parent mt-2 d-flex justify-content-end">
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewBoard;
