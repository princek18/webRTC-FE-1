/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageCard } from "./MessageCard";
import { AppDataProvider } from "../Context/AppContext";

export const Chat = ({ data }) => {
  const { useChatHistory, socket } = useContext(AppDataProvider);
  const [chatHistory, setChatHistory] = useChatHistory;
  const [message, setMessage] = useState("");

  const sendMessage = (e, message) => {
    e.preventDefault();
    let time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let userData = JSON.parse(sessionStorage.getItem("user")).userName;
    let receiverData = data?.userName;
    socket.emit("send", {
      data: {
        message,
        time: String(time),
        [userData]: "sent",
        [receiverData]: "received",
      },
      chatId: chatHistory?.chatId,
    });
    setMessage("");
  };

  useEffect(() => {
    let elem = document.getElementById("chat-history");
    elem.scrollTop = elem.scrollHeight;
  }, [chatHistory]);

  return (
    <div>
      <div id="chat-header">
        <ChatHeader data={data} />
      </div>
      <div id="chat-history">
        {chatHistory?.data.map((one, index) => {
          return <MessageCard data={one} key={index} />;
        })}
      </div>
      <form id="chat-input" onSubmit={(e) => sendMessage(e, message)}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          type="text"
        />
      </form>
    </div>
  );
};
