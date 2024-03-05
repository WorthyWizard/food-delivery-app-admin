import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";

import { ProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./constants";
import { productCategoriesQueryKeys } from "./queryKeys";

export const deleteProductCategory = async (
  id: number,
): Promise<ProductCategory> => {
  return axios.delete(`${PRODUCT_CATEGORIES_PATH}/${id}`);
};

export const useDeleteProductCategory = (
  config?: MutationConfig<typeof deleteProductCategory>,
) => {
  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES],
      });

      onSuccess && onSuccess(data, variables, context);
    },
    ...restConfig,
    mutationFn: deleteProductCategory,
  });
};
