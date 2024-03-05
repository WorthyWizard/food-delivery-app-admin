import { Route, Routes } from "react-router-dom";

import { Orders } from "./Orders";

export const OrdersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Orders />} />
    </Routes>
  );
};
