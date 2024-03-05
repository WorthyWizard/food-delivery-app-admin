import { Stack, StackProps, styled } from "@mui/material";

export const StyledForm = styled(
  ({ children, ...rest }: StackProps<"form">) => (
    <Stack component="form" {...rest}>
      {children}
    </Stack>
  ),
)(({ theme }) => ({
  width: "100%",
  height: "100%",
  alignItems: "center",
  gap: theme.spacing(1),
  position: "relative",
}));
