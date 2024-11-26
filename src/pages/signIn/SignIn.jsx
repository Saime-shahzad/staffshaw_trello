import React, { useState } from "react";
import Forms from "../../assets/forms/Forms";
import trelloLogo from "../../assets/images/trelloLogo.png";

import "./SignIn.css";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux-store/auth/authSlice'

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch=useDispatch()

  const formContent = [
    {
      id: 1,
      label: "Email",
      name: "email",
      type: "text",
      message: "Email is Required",
      required: true,
    },
    {
      id: 1,
      label: "Password",
      name: "password",
      type: "password",
      message: "Password is Required",
      required: true,
    },
  ];

 
  
  const onFinish = async (values) => {
      const res = await dispatch(loginUser(values));
    console.log('res:', res);
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Successfully Login");
      setIsLoading(false);
    }, 3000);
    // if(res){
    //   setIsLoading(true)
    //   setTimeout(() => {
    //     setIsLoading(false)

    //   }, 2000);

    // }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="parent">
      <div className="child-1 forms-control vh-100 d-flex w-100 justify-content-center align-items-center">
        <Forms
          loading={isLoading}
          formContent={formContent}
          buttonName="Sign In"
          image={trelloLogo}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      </div>
    </div>
  );
};

export default SignIn;
