import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./common/constants";

export const api = createApi({
  reducerPath: "api",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["PRODUCTS", "USERS"],
  endpoints: () => ({}),
});

export default api;
