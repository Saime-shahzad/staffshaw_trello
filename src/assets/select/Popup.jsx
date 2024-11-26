import React from 'react';
import {  Popconfirm } from 'antd';
import "./Popup.css"

const Popup = ({title , component , icon , className}) => (
  <Popconfirm
    title={title}
    description={component}
    icon={null}
   trigger="click"
   className="custom-popconfirm" 
   
    overlayStyle={{ width: '350px' }}
  >
    <button className= {className} danger>{icon}</button>
  </Popconfirm>
);
export default Popup;