import { ChangeEvent } from "react";
import { FieldValues, useController } from "react-hook-form";
import { OutlinedTextFieldProps, TextField } from "@mui/material";

import { ControlledFormFieldProps } from "../types";

interface Props<TFormValues extends FieldValues = FieldValues>
  extends Omit<OutlinedTextFieldProps, "variant">,
    ControlledFormFieldProps<TFormValues> {}

export const FormTextField = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>,
) => {
  const { config, onChange, ...rest } = props;

  const controller = useController(config);
  const { ref, onChange: onFieldChange, ...fieldRest } = controller.field;
  const { error } = controller.fieldState;

  const changeHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    onFieldChange(event.target.value);

    onChange && onChange(event);
  };

  return (
    <TextField
      fullWidth
      {...rest}
      {...fieldRest}
      onChange={changeHandler}
      inputRef={ref}
      error={Boolean(error?.message)}
      helperText={error?.message}
    />
  );
};
