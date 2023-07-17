import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";
import { MongoObjectId } from "@/types/mongo";

import { ProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./hardcoded";
import { productCategoriesQueryKeys } from "./queryKeys";

export const getProductCategory = async (id: MongoObjectId) => {
  const { data } = await axios.get<ProductCategory>(
    `${PRODUCT_CATEGORIES_PATH}/${id}`
  );

  return data;
};

type QueryFnType = typeof getProductCategory;

interface Options {
  id: MongoObjectId | null;
  config?: QueryConfig<QueryFnType>;
}

export const useGetProductCategory = (options: Options) => {
  const { id, config } = options || {};

  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    enabled: Boolean(id),
    ...config,
    queryFn: () => getProductCategory(id!),
    queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES, id],
  });
};
