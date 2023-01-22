import { OutlinedTextFieldProps } from "@mui/material";
import { FieldValues, useController } from "react-hook-form";
import { useFormState } from "../context/FormStateContext";
import { StyledTextField } from "../styled";
import { HookFormFieldProps } from "../types";

type OmittedOutlinedTextFieldProps = Omit<OutlinedTextFieldProps, "variant">;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedOutlinedTextFieldProps,
    HookFormFieldProps<TFormValues> {}

const FormTextField = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, multiline, disabled, ...rest } = props;

  const { isLoading } = useFormState() || {};

  const controller = useController(config);
  const { ref, ...fieldRest } = controller.field;
  const { error } = controller.fieldState;

  return (
    <StyledTextField
      disabled={isLoading || disabled}
      inputRef={ref}
      multiline={multiline}
      {...rest}
      {...fieldRest}
      error={Boolean(error?.message)}
      helperText={error?.message}
    />
  );
};

export default FormTextField;
