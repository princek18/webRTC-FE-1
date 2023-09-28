import axios from "axios";
import { baseUrl } from "../src/main";
import { Notification } from "./Notification";

export const RequestAPI = async (method, endpoint, data, params) => {
  let authToken = `ChAp ${sessionStorage.getItem("AuthToken")}`;
  return axios({
    method: method,
    url: `${baseUrl}/${endpoint}`,
    headers: {
      authToken,
    },
    data,
    params,
  })
    .then((res) => res.data)
    .catch((e) => {
      Notification("error", "Error", e.response.data.message);
    });
};
