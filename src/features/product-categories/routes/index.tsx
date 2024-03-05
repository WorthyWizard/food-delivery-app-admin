import { Route, Routes } from "react-router-dom";

import { ProductCategories } from "./ProductCategories";

export const ProductCategoriesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductCategories />} />
    </Routes>
  );
};
