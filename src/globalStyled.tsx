import {
  Stack,
  StackProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";

export const ModalHeading = styled(({ children, ...rest }: TypographyProps) => (
  <Typography variant="h5" {...rest}>
    {children}
  </Typography>
))(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(3),
})) as typeof Typography;

export const StyledForm = styled(
  ({ children, ...rest }: StackProps<"form">) => (
    <Stack component="form" {...rest}>
      {children}
    </Stack>
  )
)(({ theme }) => ({
  height: "100%",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  gap: theme.spacing(2),
  position: "relative",
}));
