import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { Navigation } from "@/components";
import { useDomHeight } from "@/hooks";

import { AppBar, Drawer, PageContentWrapper } from "./styled";

export const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", setResizeWidth);
    return () => window.removeEventListener("resize", setResizeWidth);
  }, []);

  const dynamicHeight = useDomHeight({
    initialHeight: windowHeight,
    substractFrom: ["substract-height"],
  });

  const setResizeWidth = () => {
    setWindowHeight(window.innerHeight);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        className="substract-height"
        position="absolute"
        open={open}
        elevation={0}
      >
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction="row" alignItems="center" gap={1}>
            <FastfoodIcon />
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
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <Navigation />
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <PageContentWrapper maxHeight={dynamicHeight}>
          <Outlet />
        </PageContentWrapper>
      </Box>
    </Box>
  );
};
