import { createBrowserRouter } from "react-router-dom";

import { ProductCategories } from "@/features/product-categories";
import { Products } from "@/features/products";
import { Dashboard } from "@/pages";

import { CATEGORIES, HOME, PRODUCTS, USERS } from "./endpointConstants";

export const router = createBrowserRouter([
  {
    path: HOME,
    element: <Dashboard />,
    children: [
      {
        path: PRODUCTS,
        element: <Products />,
      },
      {
        path: USERS,
        element: <h1>Users</h1>,
      },
      {
        path: CATEGORIES,
        element: <ProductCategories />,
      },
    ],
  },
]);
