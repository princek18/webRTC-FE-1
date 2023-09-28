import { Form, Input, Modal } from "antd";
import { useContext, useEffect } from "react";
import { AppDataProvider } from "../Context/AppContext";
import { Notification } from "../../Utils/Notification";
export const AddContactsModal = () => {
  const [form] = Form.useForm();
  const { useAddContactModel, socket } = useContext(AppDataProvider);
  const [openAddContactModel, setOpenAddContactModel] = useAddContactModel;
  const handleOk = () => {
    socket.emit("add-contact", { userName: form.getFieldValue("userName") });
  };
  const handleCancel = () => {
    form.resetFields();
    setOpenAddContactModel(false);
  };

  useEffect(() => {
    socket.on("add-contact-ack", (data) => {
      socket.emit("get-contacts");
      form.resetFields();
      setOpenAddContactModel(false);
      Notification("success", "Success", data.message);
    });
  }, []);
  return (
    <>
      <Modal
        title="Add Contacts"
        open={openAddContactModel}
        onOk={handleOk}
        onCancel={handleCancel}
        width="350px"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 300,
          }}
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
        </Form>
      </Modal>
    </>
  );
};
