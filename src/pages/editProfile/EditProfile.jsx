import React, { useEffect, useState } from "react";
import Forms from "../../assets/forms/Forms";

import "./EditProfile.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux-store/auth/authSlice";
import { toast } from "react-toastify";
// import { getUsers } from "../../redux-store/users/userSlice";
import { useSelector } from "react-redux";
// import { useEffect } from 'react'
import { getUserDetails } from '../../redux-store/users/userSlice'

const EditProfile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const getUserProfileDetails = useSelector(
    (state) => state.user?.userProfileData
  );
  console.log("getUserProfileDetails>>>", getUserProfileDetails);


  // const initialValues = {
  //   full_name: "John Doe", // Pre-filled name
  //   email: "johndoe@example.com", // Pre-filled email
  //   workspace: "4", // Pre-selected workspace
  //   bord: "Board name",
  // };
  const formContent = [
    {
      id: 1,
      label: "Full Name",
      name: "full_name",
      disable: true,
      type: "text",
      message: "User Name is Required",
      required: true,
    },
    {
      id: 2,
      label: "Email",
      name: "email",
      disable: true,
      type: "email",
      message: "Email is Required",
      required: true,
    },
    {
      id: 3,
      label: "Password",
      name: "password",
      disable: true,
      type: "password",
      message: "Password is Required",
      required: true,
    },
    {
      id: 4,
      label: "Confirm Password",
      name: "password_confirmation",
      disable: true,
      type: "password",
      message: "password confirmation is Required",
      required: true,
    },
    {
      id: 5,
      label: "Work Space",
      name: "workspace",
      type: "text",
      message: "Work Space is Required",
      disable: true,
      required: true,
      
    },
    {
      id: 5,
      label: "Bords",
      name: "bord",
      type: "text",
      message: "Bord is Required",
      disable: true,
      required: true,
     
    },
  ];
  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await dispatch(registerUser(values));
    console.log("res:", res.payload);
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Successfully Regesterd");
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

  useEffect(() => {
    if (localStorage.getItem("role")?.includes("user")) {
      const userData = "user";
      dispatch(getUserDetails(userData));
    } else {
      dispatch(getUserDetails());
    }
  }, [dispatch]);

  return (
    <div className="parent">
      <div className="child-1 forms-control vh-100 d-flex w-100 justify-content-center align-items-center">
        {(getUserProfileDetails && Object.keys(getUserProfileDetails).length > 0) && <Forms
          loading={isLoading}
          initialValues={getUserProfileDetails?.user}
          formTitle="Profile"
          buttonName="Update"
          onFinish={onFinish}
          formContent={formContent}
          onFinishFailed={onFinishFailed}
        />}
      </div>
    </div>
  );
};

export default EditProfile;
