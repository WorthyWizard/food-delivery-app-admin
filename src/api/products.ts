import { MongoObjectId } from "@/types/mongo";
import { Product } from "@/types/products/dataTypes";
import { CreateProduct, UpdateProduct } from "@/types/products/mutations";
import api from "./main";

const productsAPI = api.injectEndpoints({
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
      query: (newProduct) => ({
        url: `/products`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["PRODUCTS"]),
    }),
    updateProduct: builder.mutation<Product, UpdateProduct>({
      query: (updatedProduct) => ({
        url: `/products/${updatedProduct._id}`,
        method: "PATCH",
        body: updatedProduct,
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

export default productsAPI;
