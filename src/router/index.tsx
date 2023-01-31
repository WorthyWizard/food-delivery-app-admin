import { createBrowserRouter } from "react-router-dom";

import { Dashboard, Products, Users } from "@/pages";
import { HOME, PRODUCTS, USERS } from "./endpointConstants";

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
        element: <Users />,
      },
    ],
  },
]);
