import { MongoObjectId } from "@/types/mongo";
import { Product } from "@/types/product/queries";
import { CreateProduct, UpdateProduct } from "@/types/product/mutations";
import { api } from "./main";

export const productsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["PRODUCTS"],
    }),
    getProduct: builder.query<Product, MongoObjectId>({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["PRODUCTS"],
    }),
    createProduct: builder.mutation<CreateProduct, FormData>({
      query: (formData) => ({
        url: `/products`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["PRODUCTS"]),
    }),
    updateProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: `/products/${formData.get("_id")}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["PRODUCTS"]),
    }),
    deleteProduct: builder.mutation<Product, MongoObjectId>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) => (error ? [] : ["PRODUCTS"]),
    }),
  }),
});
