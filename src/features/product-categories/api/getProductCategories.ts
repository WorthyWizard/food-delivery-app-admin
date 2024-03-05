import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { ProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./constants";
import { productCategoriesQueryKeys } from "./queryKeys";

export const getProductCategories = async (): Promise<ProductCategory[]> => {
  return axios.get(PRODUCT_CATEGORIES_PATH);
};

type QueryFnType = typeof getProductCategories;

export const useGetProductCategories = (config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...config,
    queryFn: () => getProductCategories(),
    queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES],
  });
};
