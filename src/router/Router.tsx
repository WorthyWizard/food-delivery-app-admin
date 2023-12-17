import { createBrowserRouter } from "react-router-dom";

import { ProductCategories } from "@/features/product-categories";
import { ProductRoutes } from "@/features/products";
import { Dashboard } from "@/layouts";

import { mainEndpointsMap } from "./endpoints";

export const router = createBrowserRouter([
  {
    path: mainEndpointsMap.HOME,
    element: <Dashboard />,
    children: [
      {
        path: `${mainEndpointsMap.PRODUCTS}/*`,
        element: <ProductRoutes />,
      },
      {
        path: mainEndpointsMap.USERS,
        element: <h1>Users</h1>,
      },
      {
        path: mainEndpointsMap.CATEGORIES,
        element: <ProductCategories />,
      },
    ],
  },
]);
