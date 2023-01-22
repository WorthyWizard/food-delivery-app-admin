import { FC } from "react";

import { StyledForm } from "@/globalStyled";
import { FormProps, FormStateProvider } from "@/features/form";
import { ButtonWrapper } from "../UI";

interface Props extends FormProps {
  isLoading?: boolean;
}

const Form: FC<Props> = (props) => {
  const { children, isLoading, ...rest } = props;

  return (
    <FormStateProvider isLoading={isLoading}>
      <StyledForm {...rest}>{children}</StyledForm>
    </FormStateProvider>
  );
};

export default Form;
