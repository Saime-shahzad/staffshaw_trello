import React, { useState } from "react";
import { Table } from "antd";
import { Inputs } from "../../assets/input/Inputs";
import icons from "../../assets/icons";

const Tables = () => {
  const [isOpen, setIsOpen] = useState("");
  console.log("isOpen>>", isOpen);

  const handleSearchName = (item) => {
    setIsOpen("Name");
  };

  const handleSearchAddress = (item) => {
    setIsOpen("Address");
  };

  const onCloseClick = () => {
    setIsOpen("");
  };
  const columns = [
    {
      title:
        isOpen !== "Name" ? (
          <div onClick={(e) => handleSearchName(e)}>Address</div>
        ) : (
          <div value="Name">
            <Inputs
              placeholder="Search by Name"
              suffix={icons.popupclose}
              onCloseClick={onCloseClick}
            />
          </div>
        ),
      dataIndex: "name",
      key: "name",
    },

    {
      title:
        isOpen !== "Address" ? (
          <div onClick={(e) => handleSearchAddress(e)}>Address</div>
        ) : (
          <div value="Address">
            <Inputs
              placeholder="Search by Address"
              suffix={icons.popupclose}
              onCloseClick={onCloseClick}
            />
          </div>
        ),
      dataIndex: "address",
      key: "address",
    },
  ];
  const data = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
    },
  ];
  return (
    <Table
      columns={columns}
      filterSearch={true}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
            }}
          >
            {record.description}
          </p>
        ),
      }}
      dataSource={data}
    />
  );
};
export default Tables;
