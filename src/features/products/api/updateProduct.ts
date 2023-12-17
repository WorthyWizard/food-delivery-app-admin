import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { createFormData, FormDataAlike } from "@/utils";

import { Product, UpdateProduct } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const updateProduct = (
  body: FormDataAlike<UpdateProduct>,
): Promise<Product> => {
  return axios.patch(`/products/${body._id}`, createFormData(body));
};

type MutationFnType = typeof updateProduct;

interface Options {
  config?: MutationConfig<MutationFnType>;
}

export const useUpdateProduct = (options?: Options) => {
  const { config } = options || {};

  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [productsQueryKeys.PRODUCTS, variables._id],
      });

      onSuccess && onSuccess(data, variables, context);
    },
    ...restConfig,
    mutationFn: updateProduct,
  });
};
