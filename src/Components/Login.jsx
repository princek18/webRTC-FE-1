import { Button, Form, Input } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppDataProvider } from "../Context/AppContext";

export const Login = () => {
  const { LoginUser } = useContext(AppDataProvider);

  const onFinish = async (values) => {
    LoginUser(values).then((res) => {
      if (res) {
        window.location.href = "/contacts";
      }
    });
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
          <Link to="/signup">Create new account ?</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
