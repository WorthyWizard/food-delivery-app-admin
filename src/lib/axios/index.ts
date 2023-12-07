import { toast } from "react-toastify";
import Axios from "axios";

import { API_URL } from "@/config";

import { messages } from "./messages";

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error?.message || messages.error;

    toast.error(message);

    return Promise.reject(error);
  }
);
