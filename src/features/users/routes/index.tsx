import { Route, Routes } from "react-router-dom";

import { Users } from "./Users";

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
    </Routes>
  );
};
