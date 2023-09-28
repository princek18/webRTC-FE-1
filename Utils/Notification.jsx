import { notification } from "antd";

export const Notification = (type, message, description) => {
  notification.destroy();
  notification.open({
    message,
    description,
    type,
  });
};
