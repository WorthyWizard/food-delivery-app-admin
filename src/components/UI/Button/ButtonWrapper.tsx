import { FC } from "react";
import { Stack, StackProps } from "@mui/material";

export const ButtonWrapper: FC<StackProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <Stack
      py={1}
      gap={2}
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      {...rest}
    >
      {children}
    </Stack>
  );
};
