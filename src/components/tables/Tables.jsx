import React, { useState } from "react";
import { Table } from "antd";
import { Inputs } from "../../assets/input/Inputs";
import icons from "../../assets/icons";
import Loader from "../../assets/loader/Loader";

const Tables = ({data}) => {
  const [isOpen, setIsOpen] = useState("");

  const handleSearchByName = (item) => {
    setIsOpen("full_name");
  };

  const handleSearchByEmail = (item) => {
    setIsOpen("email");
  };

  const onCloseClick = () => {
    setIsOpen("");
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
     {!data ?
     <div>
      <Loader />
     </div>
     
     :
    <Table
      columns={columns}
      filterSearch={true}
    
      expandable={{
        expandedRowRender: ((record) => {
          return(
          <p
            style={{
              margin: 0,
            }}
          >
            {record.email}
          </p>
        )}),
        
      }}
      
      dataSource={data}
    />}
     </>
  );
};
export default Tables;
