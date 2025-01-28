import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Inputs } from "../../assets/input/Inputs";
import icons from "../../assets/icons";
import Loader from "../../assets/loader/Loader";
import CheckBox from "../../assets/checkbox/CheckBox";
import { approveUser } from "../../redux-store/users/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Tables = ({data}) => {
  const [isOpen, setIsOpen] = useState("");
  const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
  
  const dispatch = useDispatch();


  const handleSearchByName = (item) => {
    setIsOpen("full_name");
  };

  const handleSearchByEmail = (item) => {
    setIsOpen("email");
  };

  const onCloseClick = () => {
    setIsOpen("");
  };
  useEffect(() => {
  
  }, [refresh  , dispatch])
  
  const onChangeCheckedBox = async(e , item) => {
    if(e.target.checked === true){
      const userData={
        user_id:item.user_id,
        workspace_id:item.workspace_id,
        board_id:item.board_id, 
        status:"approved"
        
      }
      
      try {
        const response = await dispatch(approveUser(userData));
        if (response?.payload?.status) {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            setRefresh((prev) => !prev);
            toast.success("Successfully Updated");
          }, 2000);
        } else {
          toast.error("Failed to update");
        }
      } catch (error) {
        console.error("Error approving user:", error);
        toast.error("An error occurred while updating");
      }

      

    }
  };
  const columns = [
    {
      title:
        isOpen !== "full_name" ? (
          <div onClick={(e) => handleSearchByName(e)}>Full Name</div>
        ) : (
          <div value="full_name">
            <Inputs
              placeholder="Search by Full Name"
              suffix={icons.popupclose}
              onCloseClick={onCloseClick}
            />
          </div>
        ),
      dataIndex: "full_name",
      key: "full_name",
    },

    {
      title:
        isOpen !== "email" ? (
          <div onClick={(e) => handleSearchByEmail(e)}>Email</div>
        ) : (
          <div value="email">
            <Inputs
              placeholder="Search by Email"
              suffix={icons.popupclose}
              onCloseClick={onCloseClick}
            />
          </div>
        ),
      dataIndex: "email",
      key: "email",
    },
  ];
    return (
      <>
     {!data || isLoading ?
     <div className="d-flex justify-content-center align-items-center">
      <Loader />
     </div>
     
     :
    <Table
      columns={columns}
      filterSearch={true}
    
      expandable={{
        expandedRowRender: ((record) => {
          
          return(
            <div>
            {record?.workspace_requests?.map((item) =>{
            console.log("item.status>>>" , item.status);
              

return(
  <div>
      {item && item.status ==="pending" ?
      <CheckBox onChange={(e) => onChangeCheckedBox(e , item)} label={item.workspace?.name} /> :
      item && item.status ==="approved" ? <div><sapn className="">{icons.checkIcons}</sapn>{item.workspace?.name}</div>

        : 
        <div>No Any Request</div>
      }
    </div>
)
            }) 
          }
          </div>
        )}),
        
      }}
      
      dataSource={data}
    />}
     </>
  );
};
export default Tables;
