import { Box, Stack, styled, Typography } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));

export const StyledMessage = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.text.secondary,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
