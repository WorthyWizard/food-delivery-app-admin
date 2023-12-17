import { Outlet } from "react-router-dom";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { AppBar, Drawer, Stack, Toolbar, Typography } from "@mui/material";

import { Navigation } from "@/components";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const drawerWidth = 240;

export const Dashboard = () => {
  return (
    <Stack direction="row" height="100%">
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar variant="dense">
          <Stack direction="row" alignItems="center" gap={1}>
            <FastfoodRoundedIcon />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Food Delivery App
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
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
