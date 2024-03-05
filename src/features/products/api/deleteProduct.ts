import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { Product } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const deleteProduct = async (id: number): Promise<Product> => {
  return await axios.delete(`/products/${id}`);
};

export const useDeleteProduct = (
  config?: MutationConfig<typeof deleteProduct>,
) => {
  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [productsQueryKeys.PRODUCTS],
        exact: true,
      });

      onSuccess && onSuccess(data, variables, context);
    },
    ...restConfig,
    mutationFn: deleteProduct,
  });
};
