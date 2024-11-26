import React, { useRef, useState } from "react";
import "./NewBoard.css"
import icons from "../../assets/icons";
import {Inputs} from "../../assets/input/Inputs"
import { Buttons } from "../../assets/button/Buttons";
import Loader from "../../assets/loader/Loader";
import { toast } from "react-toastify";

const NewBoard = () => {
  const [isLoader , setIsLoader]=useState(false)
  const inputRef=useRef(null)
  const handleAddBoard=(() =>{
    console.log(inputRef.current?.input?.value);  // This should log the current value of the input
    if (inputRef.current?.input?.value.length > 0) {
      setIsLoader(true)
    
      setTimeout(() => {
  setIsLoader(false)
  toast.success(<div> &nbsp; Successfully Added </div>)
  
}, 3000);
}
else{
      toast.error(<div> &nbsp; Empty Board</div>)

    }
    
   
}
)
  return (
    <div className="parrent-addBoard  ">
      <div className="header ">
        
        <div className="staffShaw-title  d-flex">
        <div class="S-class-1 S-class-2">S</div>
          <div className="h5 mx-2 pt-3"> 

        StaffShaw Workspace
        <div className="pt-1" style={{fontSize:"11px"}}>
         <span className="pl-2"> Public </span>
          {icons.locakIcons}
        </div>
        </div>
        </div>
      </div>




      <div className="add-board-dection bg-white mt-2">

        {isLoader ? 
        
        <div className="p-5">
          <Loader />
          </div> : 
        <div className="form p-3">
          <div className="title h4">
            Add Your Board
          </div>
          <div>
          <label>
            Board Title: &nbsp; 
          </label>
        <Inputs ref={inputRef} placeholder='Enter Title' className='w-25' />
        </div>
        <div className="button-parent mt-2 d-flex justify-content-end">

          <Buttons text="Add+" className='text-white' onClick={handleAddBoard} />
          </div>
          </div> 
        }
      </div>

    </div>
  );
};
export default NewBoard;
