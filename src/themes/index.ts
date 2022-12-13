import { createTheme, responsiveFontSizes } from "@mui/material";
import { defaultTheme } from "./default";

const themes = {
  default: responsiveFontSizes(createTheme({ ...defaultTheme })),
};

export default themes;
