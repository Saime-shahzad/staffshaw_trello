import React from "react";
import {
  Button,
  //  Checkbox,
  Form,
  Select,
} from "antd";
import { Inputs } from "../input/Inputs";
import Loader from "../loader/Loader";
import { useLocation } from "react-router-dom";
import { useRoutFunction } from "../usefulFunctions/UseFullFunctions";

const Forms = ({
  form,
  image,
  onFinish,
  loading,
  onFinishFailed,
  buttonName,
  formContent,
  formTitle,
  handleFormChange,
  initialValues,
  multiple
}) => {
  const location=useLocation()
  const routeTo=useRoutFunction()
  
  return (
    <Form
    form={form}
   
    onValuesChange={handleFormChange}
      className="bg-white rounded-3 p-4 shadow"
      name="basic"
      
      // labelCol={{
      //   span: 8,
      // }}
      // wrapperCol={{
      //   span: 16,
      // }}
      style={{
        maxWidth: 600,
      }}
      initialValues={
        
        initialValues ? initialValues :{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      // initialValues={{
      //   full_name: "John Doe", // Pre-filled name
      //   email: "johndoe@example.com", // Pre-filled email
      //   workspace: "1", // Pre-selected workspace
      // }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Form.Item className="text-center fs-1 fw-bold">
            {image ? (
              <img alt="logo" src={image} />
            ) : (
              <div>
                <div>{formTitle}</div>
              </div>
            )}
          </Form.Item>
          {formContent?.map((item, index) => {
            return (
              <>
                <Form.Item
                  key={index}
                  label={item.label}
                  name={item.name}
                  
                  rules={[
                    {
                      required: item.required,
                      message: item.message,
                      // message: 'Please input your username!',
                    },
                  ]}
                >
                  {item.type === "select" ? (
                    <Select
                     mode= {multiple && "multiple"}
                      className="w-100"
                      disabled={item.disabled ? true : false}
                     
                      style={{ width: 120 }}
                      onChange={item.handleChange}
                      options={item.options}
                      value={item.value}
                    />
                  ) : (
                    <Inputs type={item.type}     disabled={item.disable ? true : false} autoComplete="off" />
                  )}
                </Form.Item>
              </>
            );
          })}

          {/* <Form.Item
      name="remember"
      valuePropName="checked"
    //   wrapperCol={{
    //     offset: 8,
    //     span: 16,
    //   }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

          <Form.Item
          className=""
            wrapperCol={
              {
                // offset: 8,
                // span: 16,
              }
            }
          >
            <div className="d-flex w-100 justify-content-between align-items-center">

          
            <Button type="primary" disabled={formTitle === "Profile" ? true : false} htmlType="submit">
              {buttonName}
            </Button>
            {
              (location.pathname === "/sign-in" || location.pathname === "/sign-up") &&

            <div   >
              {location.pathname === "/sign-up" ? <div  style={{fontSize:"14px"}}>Alredy Regestered!?<span className="text-info" style={{cursor:"pointer" }}  onClick={() => routeTo("/sign-in")}  >
                &nbsp;Sign In</span> </div>
                : 
                <div style={{fontSize:"14px"}}>Not Regestered Yet? <span className="text-info" style={{cursor:"pointer" }} onClick={() => routeTo("/sign-up")} > Sign Up</span> </div>} </div>
            }
            </div>
          </Form.Item>
        </>
      )}
    </Form>
  );
};
export default Forms;
