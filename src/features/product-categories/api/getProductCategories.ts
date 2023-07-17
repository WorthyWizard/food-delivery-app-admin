import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { ProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./hardcoded";
import { productCategoriesQueryKeys } from "./queryKeys";

export const getProductCategories = async () => {
  const { data } = await axios.get<ProductCategory[]>(PRODUCT_CATEGORIES_PATH);

  return data;
};

type QueryFnType = typeof getProductCategories;

interface Options {
  config?: QueryConfig<QueryFnType>;
}

export const useGetProductCategories = (options?: Options) => {
  const { config } = options || {};

  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...config,
    queryFn: () => getProductCategories(),
    queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES],
  });
};
