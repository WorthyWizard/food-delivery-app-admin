import { Navigate, Outlet } from "react-router-dom";
import { Paper, Stack } from "@mui/material";

import { Logo } from "@/components";
import { mainEndpointsMap } from "@/router";

import { useAuthStore } from "../store";

export const Auth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={mainEndpointsMap.HOME} />;
  }

  return (
    <Stack height="100%">
      <Stack height="100%" justifyContent="center" alignItems="center">
        <Paper
          sx={{
            minWidth: 500,
            px: 4,
            py: 3,
          }}
        >
          <Stack direction="row" justifyContent="center">
            <Logo mb={3} />
          </Stack>
          <Outlet />
        </Paper>
      </Stack>
    </Stack>
  );
};
