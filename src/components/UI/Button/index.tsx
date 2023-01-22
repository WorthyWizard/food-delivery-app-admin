import { FC } from "react";
import { ButtonProps } from "@mui/material";

import { StyledButton } from "./styled";

const Button: FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <StyledButton variant="contained" {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;