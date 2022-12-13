import { createBrowserRouter } from "react-router-dom";
import { HOME, PRODUCTS, USERS } from "./endpointConstants";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Users from "@/pages/Users";

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
