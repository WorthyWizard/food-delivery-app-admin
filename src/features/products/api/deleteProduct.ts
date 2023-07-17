import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { MongoObjectId } from "@/types/mongo";

import { Product } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const deleteProduct = async (id: MongoObjectId): Promise<Product> => {
  return axios.delete(`/products/${id}`);
};

type MutationFnType = typeof deleteProduct;

interface Options {
  config?: MutationConfig<MutationFnType>;
}

export const useDeleteProduct = (options?: Options) => {
  const { config } = options || {};

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([productsQueryKeys.PRODUCTS]);
    },
    ...config,
    mutationFn: deleteProduct,
  });
};
