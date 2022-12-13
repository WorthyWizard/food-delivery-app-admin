import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./router";
import themes from "./themes";

function App() {
  return (
    <ThemeProvider theme={themes.default}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
