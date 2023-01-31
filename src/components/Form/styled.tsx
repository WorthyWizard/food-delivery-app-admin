import { Stack, styled } from "@mui/material";

export const OverlayWrapper = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  zIndex: theme.zIndex.modal + 1,
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.3s, visibility 0.3s",
}));
