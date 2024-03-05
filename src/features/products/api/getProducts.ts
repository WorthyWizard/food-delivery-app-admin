import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { Product } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const getProducts = async (): Promise<Product[]> => {
  return axios.get("/products");
};

type QueryFnType = typeof getProducts;

interface Options {
  config?: QueryConfig<QueryFnType>;
}

export const useGetProducts = (options?: Options) => {
  const { config } = options || {};

  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...config,
    queryFn: () => getProducts(),
    queryKey: [productsQueryKeys.PRODUCTS],
  });
};
