import React from "react";
import {
  Button,
  //  Checkbox,
  Form,
  Select,
} from "antd";
import { Inputs } from "../input/Inputs";
import Loader from "../loader/Loader";

const Forms = ({
  image,
  onFinish,
  loading,
  onFinishFailed,
  buttonName,
  formContent,
}) => {
  return (
    <Form
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
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
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
                <div>Update Profile</div>
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
                  {item.name === "team_ids" ? (
                    <Select
                     mode="multiple"
                      className="w-100"
                     
                      style={{ width: 120 }}
                      // onChange={handleChange}
                      options={item.options}
                    />
                  ) : (
                    <Inputs type={item.type} />
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
            wrapperCol={
              {
                // offset: 8,
                // span: 16,
              }
            }
          >
            <Button type="primary" htmlType="submit">
              {buttonName}
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
};
export default Forms;
