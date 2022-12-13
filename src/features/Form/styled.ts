import { FormControlLabel, styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  maxWidth: "800px",
}));

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  justifyContent: "center",
}));
