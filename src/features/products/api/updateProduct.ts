import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient, UpdateOptions } from "@/lib/react-query";
import { createFormData, FormDataAlike } from "@/utils";

import { Product, UpdateProduct } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const updateProduct = async (
  options: UpdateOptions<FormDataAlike<UpdateProduct>>,
): Promise<Product> => {
  const { body, id } = options;

  return axios.patch(`/products/${id}`, createFormData(body));
};

export const useUpdateProduct = (
  config?: MutationConfig<typeof updateProduct>,
) => {
  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [productsQueryKeys.PRODUCTS],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: [productsQueryKeys.PRODUCTS, { id: variables.id }],
      });

      onSuccess && onSuccess(data, variables, context);
    },
    ...restConfig,
    mutationFn: updateProduct,
  });
};
