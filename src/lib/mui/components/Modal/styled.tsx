import {
  Box,
  IconButton,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";

export const ModalInnerWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minWidth: 300,
  padding: theme.spacing(2.5, 2.5, 2),
  borderRadius: 5,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.default,
}));

export const StyledIconButton = styled(IconButton)(() => ({
  position: "absolute",
  top: 5,
  right: 5,
}));

export const Heading = styled(({ children, ...rest }: TypographyProps) => (
  <Typography variant="h6" {...rest}>
    {children}
  </Typography>
))(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
})) as typeof Typography;
