import { createBrowserRouter } from "react-router-dom";

import { AuthRoutes } from "@/features/auth";
import { OrdersRoutes } from "@/features/orders";
import { ProductCategoriesRoutes } from "@/features/product-categories";
import { ProductsRoutes } from "@/features/products";
import { UsersRoutes } from "@/features/users";
import { Root } from "@/layouts/Root";

import { mainEndpointsMap } from "./endpoints/endpoints";

export const router = createBrowserRouter([
  {
    path: mainEndpointsMap.HOME,
    element: <Root />,
    children: [
      {
        path: `${mainEndpointsMap.PRODUCTS}/*`,
        element: <ProductsRoutes />,
      },
      {
        path: mainEndpointsMap.USERS,
        element: <UsersRoutes />,
      },
      {
        path: mainEndpointsMap.CATEGORIES,
        element: <ProductCategoriesRoutes />,
      },
      {
        path: mainEndpointsMap.ORDERS,
        element: <OrdersRoutes />,
      },
    ],
  },
  {
    path: `${mainEndpointsMap.AUTH}/*`,
    element: <AuthRoutes />,
  },
]);
