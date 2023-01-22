import { Box, IconButton, LinearProgress, styled } from "@mui/material";

export const ModalInnerWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minWidth: 300,
  padding: theme.spacing(4),
  borderRadius: 5,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.default,
}));

export const StyledIconButton = styled(IconButton)(() => ({
  position: "absolute",
  top: 10,
  right: 10,
}));
