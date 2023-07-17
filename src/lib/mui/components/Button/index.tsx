import { ButtonProps } from "@mui/material";

import { StyledButton } from "./styled";

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return (
    <StyledButton variant="contained" {...rest}>
      {children}
    </StyledButton>
  );
};
