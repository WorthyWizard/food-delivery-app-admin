import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { queryClient } from "./lib/react-query";
import { router } from "./router";
import { themes } from "./themes";

import "react-toastify/dist/ReactToastify.css";

dayjs.extend(localizedFormat);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={themes.default}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer pauseOnHover closeOnClick position="bottom-right" />
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
