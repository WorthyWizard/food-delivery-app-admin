import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { MongoObjectId } from "@/types/mongo";

import { ProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./hardcoded";
import { productCategoriesQueryKeys } from "./queryKeys";

export const deleteProductCategory = async (
  id: MongoObjectId,
): Promise<ProductCategory> => {
  return axios.delete(`${PRODUCT_CATEGORIES_PATH}/${id}`);
};

type MutationFnType = typeof deleteProductCategory;

interface Options {
  config?: MutationConfig<MutationFnType>;
}

export const useDeleteProductCategory = (options?: Options) => {
  const { config } = options || {};

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES],
      });
    },
    ...config,
    mutationFn: deleteProductCategory,
  });
};
