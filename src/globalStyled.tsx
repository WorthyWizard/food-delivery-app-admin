import {
  Stack,
  StackProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";

export const ModalHeading = styled(({ children, ...rest }: TypographyProps) => (
  <Typography variant="h6" {...rest}>
    {children}
  </Typography>
))(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
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
  gap: theme.spacing(1),
  position: "relative",
}));
