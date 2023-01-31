import { MongoObjectId } from "@/types/mongo";
import { Category } from "@/types/category/queries";
import { CreateCategory, UpdateCategory } from "@/types/category/mutations";
import { api } from "./main";

export const categoriesAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["CATEGORIES"],
    }),
    getCategory: builder.query<Category, MongoObjectId>({
      query: (id) => ({
        url: `/categories/${id}`,
      }),
      providesTags: ["CATEGORIES"],
    }),
    createCategory: builder.mutation<Category, CreateCategory>({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["CATEGORIES"]),
    }),
    updateCategory: builder.mutation<Category, UpdateCategory>({
      query: (data) => ({
        url: `/categories/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["CATEGORIES"]),
    }),
    deleteCategory: builder.mutation<Category, MongoObjectId>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) => (error ? [] : ["CATEGORIES"]),
    }),
  }),
});
