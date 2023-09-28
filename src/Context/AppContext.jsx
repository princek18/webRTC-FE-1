/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../main";
import { Notification } from "../../Utils/Notification";
import { socket } from "../AppRoutes";

export const AppDataProvider = createContext();

export const AppContext = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [chatHistory, setChatHistory] = useState({
    data: [],
    chatId: "",
  });
  const [openAddContactModel, setOpenAddContactModel] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("AuthToken")) {
      setTimeout(() => {
        socket.emit("get-contacts");
      }, 1000);

      socket.on("receive-contacts", (data) => {
        setContacts(data.data);
        setSelectedChat(data.data[0]);
      });

      socket.on("receive-chat", (data) => {
        setChatHistory(data);
      });

      socket.on("error", (data) => {
        Notification("error", "Error", data.message);
      });
    }
  }, []);

  useEffect(() => {
    if (selectedChat?.chatId) {
      socket.emit("get-chat", selectedChat.chatId);
    }
  }, [selectedChat]);

  const LoginUser = async (values) => {
    return axios({
      method: "post",
      url: `${baseUrl}/login`,
      data: values,
    })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("AuthToken", res.data.authToken);
        return 1;
      })
      .catch((e) => {
        Notification("error", "Error", e.response.data.message);
      });
  };

  const SignUpUser = async (values) => {
    return axios({
      method: "post",
      url: `${baseUrl}/signup`,
      data: values,
    })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        Notification("error", "Error", e.response.data.message);
      });
  };

  return (
    <AppDataProvider.Provider
      value={{
        useContacts: [contacts, setContacts],
        useSelectedChat: [selectedChat, setSelectedChat],
        useUserData: JSON.parse(sessionStorage.getItem("user")),
        useChatHistory: [chatHistory, setChatHistory],
        LoginUser,
        SignUpUser,
        useAddContactModel: [openAddContactModel, setOpenAddContactModel],
        socket,
      }}
    >
      {children}
    </AppDataProvider.Provider>
  );
};
