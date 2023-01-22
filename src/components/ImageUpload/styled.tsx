import { Stack, StackProps, styled } from "@mui/material";
import { forwardRef } from "react";

export const ImageUploadWrapper = styled(Stack)(({ theme }) => ({
  width: "100%",
  maxWidth: "250px",
  height: "250px",
  position: "relative",
  "&:hover .img-controls": {
    opacity: 1,
    visibility: "visible",
  },
}));

export const ControlsWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: 3,
  borderRadius: theme.spacing(1),
  opacity: 0,
  visibility: "hidden",
  transition: "visibility 0.3s,opacity 0.3s",
}));

export const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: theme.spacing(1),
  objectFit: "cover",
}));

interface DroppableWrapperProps extends StackProps {
  isDragActive?: boolean;
}

export const DroppableWrapper = styled(
  forwardRef((props: DroppableWrapperProps, ref) => (
    <Stack {...props} ref={ref} />
  )),
  {
    shouldForwardProp: (prop) => prop !== "isDragActive",
  }
)(({ theme, isDragActive }) => ({
  padding: theme.spacing(3),
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: theme.spacing(1),
  ...(isDragActive && {
    backgroundColor: theme.palette.primary.light,
    color: "white",
  }),
  ...(!isDragActive && {
    border: "3px dashed lightgrey",
  }),
  "&:hover": {
    opacity: 0.7,
  },
}));
