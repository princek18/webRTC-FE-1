/* eslint-disable react/prop-types */
import { Button } from "antd";
import { useContext } from "react";
import { AppDataProvider } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

export const ContactsHeader = () => {
  const navigate = useNavigate();
  const { useUserData, socket } = useContext(AppDataProvider);

  const handleLogout = () => {
    socket.disconnect();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div id="contacts-header">
      <div id="img-div">
        <img src={useUserData.pic} alt="" />
        <p>{useUserData.name}</p>
      </div>
      <Button danger onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};
