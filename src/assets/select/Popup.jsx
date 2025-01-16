import React from "react";
import { Popconfirm } from "antd";
import "./Popup.css";

const Popup = ({ title, component, icon, className }) => (
  <Popconfirm
    title={title}
    description={component}
    icon={null}
    trigger="click"
    className="custom-popconfirm"
    overlayStyle={{ width: "350px" }}
  >
    {/* Merge icon and title */}
    <button className={className} danger style={{fontSize:"14px", color:"#172B4D", display: "flex", alignItems: "center", gap: "8px" }}>
  {icon} {title}
</button>
  </Popconfirm>
);

export default Popup;
