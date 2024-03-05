import {
  AUTH,
  CATEGORIES,
  EDIT,
  HOME,
  NEW,
  ORDERS,
  PRODUCTS,
  SIGN_IN,
  SIGN_UP,
  USERS,
} from "./constants/endpoints";
import { AllEndpoints } from "./types";

export const mainEndpointsMap = {
  HOME,
  CATEGORIES,
  PRODUCTS,
  USERS,
  ORDERS,
  AUTH,
};

export const authEndpointsMap = {
  SIGN_IN,
  SIGN_UP,
};

export const productsEndpointsMap = {
  NEW,
  EDIT,
};

export const allEndpointsNameMap: Record<AllEndpoints, string> = {
  "/": "Home",
  "product-categories": "Categories",
  products: "Products",
  users: "Users",
  edit: "Edit",
  new: "Create",
  orders: "Orders",
  auth: "Auth",
  "sign-in": "Sign In",
  "sign-up": "Sign Up",
};
