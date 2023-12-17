import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { ProductCategory, UpdateProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./hardcoded";
import { productCategoriesQueryKeys } from "./queryKeys";

export const updateProductCategory = async (
  body: UpdateProductCategory,
): Promise<ProductCategory> => {
  return axios.patch(`${PRODUCT_CATEGORIES_PATH}/${body._id}`, body);
};

type MutationFnType = typeof updateProductCategory;

interface Options {
  config?: MutationConfig<MutationFnType>;
}

export const useUpdateProductCategory = (options?: Options) => {
  const { config } = options || {};

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES],
      });
    },
    ...config,
    mutationFn: updateProductCategory,
  });
};
