import React, { useEffect, useState } from 'react'
import Forms from '../../assets/forms/Forms'
import trelloLogo from "../../assets/images/trelloLogo.png"

import "./SignUp.css"
import { useDispatch } from 'react-redux'
import {registerUser } from '../../redux-store/auth/authSlice'
import { toast } from 'react-toastify'
import { getBaord, getWorkspaces } from '../../redux-store/boards/boardSlice'
import { useSelector } from 'react-redux'
import { Form } from 'antd'
import { useRoutFunction } from '../../assets/usefulFunctions/UseFullFunctions'

const SignUp = () => {
    const dispatch=useDispatch()
    const [ isLoading,setIsLoading] = useState(false)
    const [form] = Form.useForm(); // Add form instance
    const getBoardsData = useSelector(
      (state) => state.boards?.boards
    );
    const getWorkspacesData = useSelector(
      (state) => state.boards?.workspaces
    );
    
    
    const routeTo=useRoutFunction()
     useEffect(() => {
      dispatch(getWorkspaces())
    } , [ dispatch])
    
    
   
    const formContent=[
      {
        id:1,
        label:"Full Name", 
        name:"full_name", 
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
        label:"Work Space", 
        name:"workspace", 
        type:"select" , 
        message:"Work Space is Required", 
        required:true,
        options: Object.entries(getWorkspacesData).map(([key, value]) => {
        return  { value: key, label: value }
        })
        
        
        
        
      },
      {
        id:5,
        label:"Board", 
        name:"board", 
        type:"select" , 
        
        message:"Board is Required", 
        required:true,
        // options:isOptionValue
        options:getBoardsData.map((item) => ({
          value: item.id,
          label: item.title,
        })) 
        
        // options:[
        //     { value: '1', label: 'sales' },
        //     { value: '2', label: 'production' },
            
        //   ]


      },
    ]

    const handleFormChange = (changedValues, allValues) => {

      if(allValues.workspace ){
      dispatch(getBaord(allValues.workspace))
      
      if(changedValues.workspace) {

        form.resetFields(["board"])
      }
      
    

      }
      console.log("All Form Values:", allValues);
    };

    const onFinish = (async(values) => {
        
        const res = await dispatch(registerUser(values));
      console.log('res:', res);
      
      setIsLoading(true)
     
      
      if(res.error){
       
        setTimeout(() => {
          toast.error(res.payload.message)
          setIsLoading(false)
  
      
          
        }, 2000);
        
      }
      else{
        setTimeout(() => {
          toast.success("Successfully Regesterd")
          setIsLoading(false)
          routeTo("/")
        }, 3000);
  
      }
    });
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  return (
    <div className='parent' >
<div className='child-1 forms-control vh-100 d-flex w-100 justify-content-center align-items-center'> 

  
  <Forms form={form} loading={isLoading} handleFormChange={handleFormChange} image={trelloLogo}  multiple={false} buttonName="Sign Up" onFinish={onFinish} formContent={formContent} onFinishFailed={onFinishFailed}/>


</div>

    </div>
  )
}

export default SignUp