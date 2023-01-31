import { createTheme, responsiveFontSizes } from "@mui/material";
import { defaultTheme } from "./default";

export const themes = {
  default: responsiveFontSizes(createTheme({ ...defaultTheme })),
};
