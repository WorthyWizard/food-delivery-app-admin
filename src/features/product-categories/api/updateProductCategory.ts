import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient, UpdateOptions } from "@/lib/react-query";

import { ProductCategory, UpdateProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./constants";
import { productCategoriesQueryKeys } from "./queryKeys";

export const updateProductCategory = async (
  options: UpdateOptions<UpdateProductCategory>,
): Promise<ProductCategory> => {
  const { body, id } = options;

  return axios.patch(`${PRODUCT_CATEGORIES_PATH}/${id}`, body);
};

export const useUpdateProductCategory = (
  config?: MutationConfig<typeof updateProductCategory>,
) => {
  const { onSuccess, ...restConfig } = config || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES],
        exact: true,
      });

      queryClient.invalidateQueries({
        queryKey: [
          productCategoriesQueryKeys.PRODUCT_CATEGORIES,
          { id: variables.id },
        ],
      });

      onSuccess && onSuccess(data, variables, context);
    },
    ...restConfig,
    mutationFn: updateProductCategory,
  });
};
