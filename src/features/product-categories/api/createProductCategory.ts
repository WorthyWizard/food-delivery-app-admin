import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { CreateProductCategory, ProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./constants";
import { productCategoriesQueryKeys } from "./queryKeys";

export const createProductCategory = async (
  body: CreateProductCategory,
): Promise<ProductCategory> => {
  return axios.post(PRODUCT_CATEGORIES_PATH, body);
};

export const useCreateProductCategory = (
  config?: MutationConfig<typeof createProductCategory>,
) => {
  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES],
        exact: true,
      });

      onSuccess && onSuccess(data, variables, context);
    },
    ...restConfig,
    mutationFn: createProductCategory,
  });
};
