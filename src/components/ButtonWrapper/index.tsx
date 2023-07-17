import { Stack, StackProps } from "@mui/material";

export const ButtonWrapper = (props: StackProps) => {
  const { children, ...rest } = props;

  return (
    <Stack
      py={1}
      gap={1}
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      {...rest}
    >
      {children}
    </Stack>
  );
};
