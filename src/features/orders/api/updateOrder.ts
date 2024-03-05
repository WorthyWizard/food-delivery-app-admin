import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient, UpdateOptions } from "@/lib/react-query";

import { Order, UpdateOrder } from "../types";

import { ordersQueryKeys } from "./queryKeys";

export const updateOrder = (
  options: UpdateOptions<UpdateOrder>,
): Promise<Order> => {
  const { body, id } = options;

  return axios.patch(`/orders/${id}`, body);
};

export const useUpdateOrder = (config?: MutationConfig<typeof updateOrder>) => {
  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [ordersQueryKeys.ORDERS],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: [ordersQueryKeys.ORDERS, { id: variables.id }],
      });

      onSuccess && onSuccess(data, variables, context);
    },
    ...restConfig,
    mutationFn: updateOrder,
  });
};
