import { Route, Routes } from "react-router-dom";

import { params, productsEndpointsMap } from "@/router";

import { Product } from "./Product";
import { Products } from "./Products";

export const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route
        path={productsEndpointsMap.NEW}
        element={<Product type="create" />}
      />
      <Route
        path={`:${params.PRODUCT_ID}/${productsEndpointsMap.EDIT}`}
        element={<Product type="edit" />}
      />
    </Routes>
  );
};
