import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { CreateProductCategory, ProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./hardcoded";
import { productCategoriesQueryKeys } from "./queryKeys";

export const createProductCategory = async (
  body: CreateProductCategory,
): Promise<ProductCategory> => {
  return axios.post(PRODUCT_CATEGORIES_PATH, body);
};

type MutationFnType = typeof createProductCategory;

interface Options {
  config?: MutationConfig<MutationFnType>;
}

export const useCreateProductCategory = (options?: Options) => {
  const { config } = options || {};

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES],
      });
    },
    ...config,
    mutationFn: createProductCategory,
  });
};
