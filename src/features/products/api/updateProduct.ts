import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { FormDataAlike } from "@/types/common";
import { createFormData } from "@/utils";

import { Product, UpdateProduct } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const updateProduct = async (
  body: FormDataAlike<UpdateProduct>
): Promise<Product> => {
  return axios.patch(`/products/${body._id}`, createFormData(body));
};

type MutationFnType = typeof updateProduct;

interface Options {
  config?: MutationConfig<MutationFnType>;
}

export const useUpdateProduct = (options?: Options) => {
  const { config } = options || {};

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([productsQueryKeys.PRODUCTS]);
    },
    ...config,
    mutationFn: updateProduct,
  });
};
