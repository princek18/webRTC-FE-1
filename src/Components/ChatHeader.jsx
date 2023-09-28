/* eslint-disable react/prop-types */
import { BiSolidVideo } from "react-icons/bi";
export const ChatHeader = ({ data }) => {
  return (
    <>
      <div id="img-div">
        <img src={data?.pic} alt="" />
        <p>{data?.name}</p>
      </div>
      <BiSolidVideo id="chat-video" />
    </>
  );
};
