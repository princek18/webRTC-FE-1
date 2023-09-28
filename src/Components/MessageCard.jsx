/* eslint-disable react/prop-types */
export const MessageCard = ({ data }) => {
  return (
    <div
      id="chat-card"
      style={
        data[JSON.parse(sessionStorage.getItem("user")).userName] === "sent"
          ? { backgroundColor: "lightgreen", marginLeft: "auto" }
          : { backgroundColor: "lightblue" }
      }
    >
      <div id="chat-message">{data?.message}</div>
      <div id="chat-time">{data?.time}</div>
    </div>
  );
};
