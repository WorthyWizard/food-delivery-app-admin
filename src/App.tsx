import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./lib/react-query";
import { router } from "./router";
import { themes } from "./themes";

import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={themes.default}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <ToastContainer pauseOnHover position="bottom-right" autoClose={5000} />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
