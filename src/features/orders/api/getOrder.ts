import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Order } from "../types";

import { ordersQueryKeys } from "./queryKeys";

export const getOrder = (id: number): Promise<Order> => {
  return axios.get(`/orders/${id}`);
};

type QueryFnType = typeof getOrder;

interface Options {
  id: number;
}

export const useGetOrder = (
  options: Options,
  config?: QueryConfig<QueryFnType>,
) => {
  const { id } = options;

  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...config,
    queryFn: () => getOrder(id),
    queryKey: [ordersQueryKeys.ORDERS, { id }],
  });
};
