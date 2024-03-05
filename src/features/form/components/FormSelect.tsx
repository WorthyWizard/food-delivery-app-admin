import { ReactNode } from "react";
import { FieldValues, useController } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

import { Select, SelectProps } from "@/lib/mui";

import { ControlledFormFieldProps } from "../types";

interface Props<TFormValues extends FieldValues = FieldValues>
  extends SelectProps,
    ControlledFormFieldProps<TFormValues> {}

export const FormSelect = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>,
) => {
  const { config, onChange, ...rest } = props;

  const { field, fieldState } = useController(config);

  const { error } = fieldState;
  const { ref, onChange: onFieldChange, ...fieldRest } = field;

  const changeHandler = (event: SelectChangeEvent, child: ReactNode) => {
    onFieldChange(event.target.value as any);

    onChange && onChange(event, child);
  };

  return (
    <Select
      inputRef={ref}
      error={Boolean(error?.message)}
      errorMessage={error?.message}
      onChange={changeHandler}
      {...fieldRest}
      {...rest}
    />
  );
};
