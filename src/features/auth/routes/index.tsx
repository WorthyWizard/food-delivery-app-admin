import { Route, Routes } from "react-router-dom";

import { authEndpointsMap } from "@/router";

import { Auth } from "./Auth";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />}>
        <Route index element={<SignIn />} />
        <Route path={authEndpointsMap.SIGN_IN} element={<SignIn />} />
        <Route path={authEndpointsMap.SIGN_UP} element={<SignUp />} />
      </Route>
    </Routes>
  );
};
