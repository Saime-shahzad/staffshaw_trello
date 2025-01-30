import React, { useState } from "react";
import Forms from "../../assets/forms/Forms";
import trelloLogo from "../../assets/images/trelloLogo.png";

import "./SignIn.css";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux-store/auth/authSlice'
import { useRoutFunction } from "../../assets/usefulFunctions/UseFullFunctions";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const routeTo=useRoutFunction()


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
      id: 2,
      label: "Password",
      name: "password",
      type: "password",
      message: "Password is Required",
      required: true,
    },
    
  ];

 
  const onFinish = (async(values) => {
    
    setIsLoading(true)
    const res = await dispatch(loginUser(values));
    console.log('res:', res);
    
    
    
    if(res.error){
      
      setTimeout(() => {
        toast.error(res.payload.message)
        setIsLoading(false)
        
        
        
      }, 2000);
      
    }
    else{
      setTimeout(() => {
        localStorage.setItem("token" , res.payload?.data.token)
      toast.success("Successfully Login");
      setIsLoading(false)
      // window.location.assign("/");
      routeTo("/" , res.payload?.data.roles )
      localStorage.setItem("role" , res.payload?.data.roles )
      window.location.reload()
    }, 2000);

  }
});
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
