/* eslint-disable react/prop-types */
import { Space } from "antd";
export const Contact = ({ data, openChat }) => {
  return (
    <Space id="card" direction="vertical" onClick={() => openChat(data)}>
      <div id="card-body">
        <div id="card-content">
          <div id="img-div">
            <img src={data.pic} alt="" />
          </div>
          <div id="card-label">
            <p id="card-title">{data.name}</p>
            <p>{data.lastMessage}</p>
          </div>
        </div>
        <p>{data.lastActive}</p>
      </div>
      <hr id="card-underline" />
    </Space>
  );
};
