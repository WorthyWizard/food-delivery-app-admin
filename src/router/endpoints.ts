import {
  CATEGORIES,
  EDIT,
  HOME,
  NEW,
  PRODUCTS,
  USERS,
} from "./constants/endpoints";
import { AllEndpoints } from "./types";

export const mainEndpointsMap = {
  HOME,
  CATEGORIES,
  PRODUCTS,
  USERS,
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
};
