import { OutlinedTextFieldProps } from "@mui/material";
import { ChangeEvent } from "react";
import { FieldValues, useController } from "react-hook-form";
import { StyledTextField } from "../styled";
import { HookFormFieldProps } from "../types";

type OmittedOutlinedTextFieldProps = Omit<OutlinedTextFieldProps, "variant">;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedOutlinedTextFieldProps,
    HookFormFieldProps<TFormValues> {}

export const FormTextField = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, onChange, ...rest } = props;

  const controller = useController(config);
  const { ref, onChange: onFieldChange, ...fieldRest } = controller.field;
  const { error } = controller.fieldState;

  const changeHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onFieldChange(event.target.value);

    onChange && onChange(event);
  };

  return (
    <StyledTextField
      onChange={changeHandler}
      {...rest}
      {...fieldRest}
      inputRef={ref}
      error={Boolean(error?.message)}
      helperText={error?.message}
    />
  );
};
