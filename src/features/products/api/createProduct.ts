import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { FormDataAlike } from "@/types/common";
import { createFormData } from "@/utils";

import { CreateProduct, Product } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const createProduct = async (
  body: FormDataAlike<CreateProduct>
): Promise<Product> => {
  return axios.post("/products", createFormData(body));
};

type MutationFnType = typeof createProduct;

interface Options {
  config?: MutationConfig<MutationFnType>;
}

export const useCreateProduct = (options?: Options) => {
  const { config } = options || {};

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([productsQueryKeys.PRODUCTS]);
    },
    ...config,
    mutationFn: createProduct,
  });
};
