import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { router } from "./router";
import { setupStore } from "./store";
import themes from "./themes";
import "react-toastify/dist/ReactToastify.css";

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={themes.default}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer
            pauseOnHover
            position="bottom-right"
            autoClose={5000}
          />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
