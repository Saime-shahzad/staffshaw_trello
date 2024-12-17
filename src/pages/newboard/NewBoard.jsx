import React, { 
  // useRef, 
  useState } from "react";
import "./NewBoard.css";
import icons from "../../assets/icons";
// import {Inputs} from "../../assets/input/Inputs"
// import { Buttons } from "../../assets/button/Buttons";
// import Loader from "../../assets/loader/Loader";
import { toast } from "react-toastify";
import Forms from "../../assets/forms/Forms";

const NewBoard = () => {
  const [isLoader, setIsLoader] = useState(false);
  // const inputRef = useRef(null);

  const formContent = [
    {
      id: 1,
      label: "work Space",
      name: "workspace_name",
      type: "select",
      message: "work Space is Required",
      required: true,
      options: [
        { value: "1", label: "sales" },
        { value: "2", label: "production" },
      ],
    },
    {
      id: 2,
      label: "Boards",
      name: "boards_name",
      type: "text",
      message: "Board is Required",
      required: true,
    },
  ];
  const handleAddBoard = (values) => {
    console.log("values>>>>", values);
    if(values.boards_name && values.workspace_name){
      setIsLoader(true);

      setTimeout(() => {
        setIsLoader(false);
        toast.success(<div> &nbsp; Successfully Added </div>);
      }, 3000);
      toast.success("empty fields")
    }
    else {
      toast.error(<div> &nbsp; Empty Board</div>);
    }

    // console.log(inputRef.current?.input?.value); // This should log the current value of the input
    // if (inputRef.current?.input?.value.length > 0) {
    //   setIsLoader(true);

    //   setTimeout(() => {
    //     setIsLoader(false);
    //     toast.success(<div> &nbsp; Successfully Added </div>);
    //   }, 3000);
    // } else {
    //   toast.error(<div> &nbsp; Empty Board</div>);
    // }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            {/* <div className="title h4">
            Add Your Board
          </div> */}
            {/* <div>
          <label>
            Board Title: &nbsp; 
          </label>
        <Inputs ref={inputRef} placeholder='Enter Title' className='w-25' />
        </div> */}
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
              {/* <Buttons text="Add+" className='text-white' onClick={handleAddBoard} /> */}
            </div>
          </div>
     
      </div>
    </div>
  );
};
export default NewBoard;
