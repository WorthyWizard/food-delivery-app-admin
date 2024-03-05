import { Navigate } from "react-router-dom";
import { Stack } from "@mui/material";

import { useAuthStore } from "@/features/auth";
import { mainEndpointsMap } from "@/router";

import { Dashboard } from "../Dashboard";
import { Header } from "../Header";

export const Root = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={mainEndpointsMap.AUTH} />;
  }

  return (
    <Stack height="100%">
      <Header />
      <Dashboard />
    </Stack>
  );
};
