import { OutlinedTextFieldProps } from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import { StyledTextField } from "../styled";
import { HookFormFieldProps } from "../types";

type OmittedOutlinedTextFieldProps = Omit<OutlinedTextFieldProps, "variant">;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedOutlinedTextFieldProps,
    HookFormFieldProps<TFormValues> {}

const FormTextField = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { controllerConfig, ...rest } = props;

  const controller = useController(controllerConfig);
  const { ref, ...fieldRest } = controller.field;
  const { error } = controller.fieldState;

  return (
    <StyledTextField
      inputRef={ref}
      {...rest}
      {...fieldRest}
      error={Boolean(error?.message)}
      helperText={error?.message}
    />
  );
};

export default FormTextField;
