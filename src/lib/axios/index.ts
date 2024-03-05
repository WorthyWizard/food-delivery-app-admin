import { toast } from "react-toastify";
import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import { useAuthStore } from "@/features/auth";
import { ErrorResponseData } from "@/types";

import { messages } from "./messages";

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Accept = "application/json";

  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (
      response.config.method !== "get" &&
      !response.config.url?.includes("auth")
    ) {
      toast.success(messages.updateSuccess);
    }

    return response.data;
  },
  (e) => {
    const error = e as AxiosError<any, ErrorResponseData>;

    const generalTitle = error.message;

    const title = error.response?.data?.error;

    const message = error.response?.data?.message;

    const combined = `${title ?? generalTitle}: ${message ?? messages.error}`;

    toast.error(combined);

    return Promise.reject(error);
  },
);
