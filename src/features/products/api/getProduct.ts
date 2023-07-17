import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { MongoObjectId } from "@/types/mongo";

import { Product } from "../types";

import { productsQueryKeys } from "./queryKeys";

export const getProduct = async (id: MongoObjectId) => {
  const { data } = await axios.get<Product>(`/products/${id}`);

  return data;
};

type QueryFnType = typeof getProduct;

interface Options {
  id: MongoObjectId | null;
  config?: QueryConfig<QueryFnType>;
}

export const useGetProduct = (options: Options) => {
  const { id, config } = options || {};

  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    enabled: Boolean(id),
    ...config,
    queryFn: () => getProduct(id!),
    queryKey: [productsQueryKeys.PRODUCTS, id],
  });
};
