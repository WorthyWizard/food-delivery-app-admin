import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Order } from "../types";

import { ordersQueryKeys } from "./queryKeys";

export const getOrders = (): Promise<Order[]> => {
  return axios.get("/orders");
};

type QueryFnType = typeof getOrders;

export const useGetOrders = (options?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...options,
    queryFn: () => getOrders(),
    queryKey: [ordersQueryKeys.ORDERS],
  });
};
