import { MongoObjectId, MongoObjectIdField } from "@/types/mongo";
import { User } from "@/types/user/queries";
import { CreateUser, UpdateUser } from "@/types/user/mutations";
import { api } from "./main";

export const usersAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => "/users",
      providesTags: ["USERS"],
    }),
    getUser: builder.query<User, MongoObjectId>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: ["USERS"],
    }),
    createUser: builder.mutation<User, CreateUser>({
      query: (newUser) => ({
        url: `/users`,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["USERS"]),
    }),
    updateUser: builder.mutation<User, UpdateUser & MongoObjectIdField>({
      query: (updatedUser) => ({
        url: `/users/${updatedUser._id}`,
        method: "PATCH",
        body: updatedUser,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["USERS"]),
    }),
    deleteUser: builder.mutation<User, MongoObjectId>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) => (error ? [] : ["USERS"]),
    }),
  }),
});
