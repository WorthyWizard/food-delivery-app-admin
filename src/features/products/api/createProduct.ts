import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { createFormData, FormDataAlike } from "@/utils";

import { CreateProduct, Product } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const createProduct = async (
  body: FormDataAlike<CreateProduct>,
): Promise<Product> => {
  return await axios.post("/products", createFormData(body));
};

export const useCreateProduct = (
  config?: MutationConfig<typeof createProduct>,
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
    mutationFn: createProduct,
  });
};
