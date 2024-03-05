import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType, QueryConfig } from "@/lib/react-query";

import { ProductCategory } from "../types";

import { PRODUCT_CATEGORIES_PATH } from "./constants";
import { productCategoriesQueryKeys } from "./queryKeys";

export const getProductCategory = async (
  id: number,
): Promise<ProductCategory> => {
  return axios.get(`${PRODUCT_CATEGORIES_PATH}/${id}`);
};

type QueryFnType = typeof getProductCategory;

interface Options {
  id: number | null;
}

export const useGetProductCategory = (
  options: Options,
  config?: QueryConfig<QueryFnType>,
) => {
  const { id } = options;

  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    enabled: Boolean(id),
    ...config,
    queryFn: () => getProductCategory(id!),
    queryKey: [productCategoriesQueryKeys.PRODUCT_CATEGORIES, { id }],
  });
};
