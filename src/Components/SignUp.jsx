import { Button, Form, Input } from "antd";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppDataProvider } from "../Context/AppContext";
import { Notification } from "../../Utils/Notification";

export const SignUp = () => {
  const navigate = useNavigate();
  const { SignUpUser } = useContext(AppDataProvider);
  const onFinish = async (values) => {
    let data = await SignUpUser(values);
    if (data) {
      Notification("success", "Success", data.message);
      Notification("info", "Info", "Redirecting to Login Page in 2 Sec!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };
  return (
    <div id="login-background">
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        id="login-form"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="cpassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords didn't match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          className="c-a"
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          className="c-a"
        >
          <Link to="/login">Already have an account ?</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
