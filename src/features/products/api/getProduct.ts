import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Product } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const getProduct = async (id: number): Promise<Product> => {
  return axios.get(`/products/${id}`);
};

type QueryFnType = typeof getProduct;

interface Options {
  id: number;
}

export const useGetProduct = (
  options: Options,
  config?: QueryConfig<QueryFnType>,
) => {
  const { id } = options;

  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...config,
    queryFn: () => getProduct(id!),
    queryKey: [productsQueryKeys.PRODUCTS, { id }],
  });
};
