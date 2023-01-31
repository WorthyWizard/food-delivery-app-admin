import { FC } from "react";

import { StyledForm } from "@/globalStyled";
import { FormProps } from "@/features/form";
import { Overlay } from "./Overlay";

interface Props extends FormProps {
  isLoading?: boolean;
}

export const Form: FC<Props> = (props) => {
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
