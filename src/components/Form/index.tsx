import { StackProps } from "@mui/material";

import { StyledForm } from "@/globalStyled";

import { Overlay } from "./Overlay";

interface Props extends StackProps<"form"> {
  isLoading?: boolean;
}

export const Form = (props: Props) => {
  const { children, isLoading, ...rest } = props;

  return (
    <StyledForm {...rest}>
      <Overlay
        sx={{ ...(isLoading && { opacity: 1, visibility: "visible" }) }}
      />
      {children}
    </StyledForm>
  );
};
