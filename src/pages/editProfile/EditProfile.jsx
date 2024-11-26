import React, { useState } from 'react'
import Forms from '../../assets/forms/Forms'

import "./EditProfile.css"
import { useDispatch } from 'react-redux'
import {registerUser } from '../../redux-store/auth/authSlice'
import { toast } from 'react-toastify'

const EditProfile = () => {
    const dispatch=useDispatch()
    const [ isLoading,setIsLoading] = useState(false)
    
    const formContent=[
      {
        id:1,
        label:"Full Name", 
        name:"name", 
        type:"text" , 
        message:"User Name is Required", 
        required:true

      },
      {
        id:2,
        label:"Email", 
        name:"email", 
        type:"email", 
        message:"Email is Required", 
        required:true


      },
      {
        id:3,
        label:"Password", 
        name:"password", 
        type:"password" , 
        message:"Password is Required", 
        required:true


      },
      {
        id:4,
        label:"Confirm Password", 
        name:"password_confirmation", 
        type:"password" , 
        message:"password confirmation is Required", 
        required:true


      },
      {
        id:5,
        label:"Teams", 
        name:"team_id", 
        // type:"password" , 
        message:"Team is Required", 
        required:true,
        options:[
            { value: '1', label: 'sales' },
            { value: '2', label: 'production' },
            
          ]


      },
    ]
    const onFinish = (async(values) => {
        console.log('Success:', values);
        const res = await dispatch(registerUser(values));
      console.log('res:', res.payload);
      setIsLoading(true)
      setTimeout(() => {
        toast.success("Successfully Regesterd")
        setIsLoading(false)
      }, 3000);



      // if(res){
      //   setIsLoading(true)
      //   setTimeout(() => {
      //     setIsLoading(false)
          
      //   }, 2000);
        
      // }
    });
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  return (
    <div className='parent' >
<div className='child-1 forms-control vh-100 d-flex w-100 justify-content-center align-items-center'> 

  
  <Forms loading={isLoading}  buttonName="Update" onFinish={onFinish} formContent={formContent} onFinishFailed={onFinishFailed}/>


</div>

    </div>
  )
}

export default EditProfile