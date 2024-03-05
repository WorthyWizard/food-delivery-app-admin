import { Outlet } from "react-router-dom";
import { Drawer, Stack, Toolbar } from "@mui/material";

import { Navigation } from "@/components";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const drawerWidth = 240;

export const Dashboard = () => {
  return (
    <Stack direction="row" height="100%">
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Navigation />
      </Drawer>
      <Stack component="main" width="100%" height="100%">
        <Toolbar />
        <Stack p={2} height="100%" overflow="hidden">
          <Breadcrumbs sx={{ mb: 2 }} />
          <Stack height="100%" overflow="hidden">
            <Outlet />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
