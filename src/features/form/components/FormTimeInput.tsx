import { FieldValues, useController } from "react-hook-form";
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers";

import { ControlledFormFieldProps } from "../types";

type FilteredTimePickerProps = Omit<
  TimePickerProps<Date>,
  "renderInput" | "value" | "onChange" | "inputRef"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends FilteredTimePickerProps,
    ControlledFormFieldProps<TFormValues> {
  onChange?: (
    value: Date | null,
    keyboardInputValue?: string | undefined,
  ) => void;
}

export const FormTimeInput = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>,
) => {
  const { config, onChange, slotProps, ...rest } = props;

  const { textField, ...restSlotProps } = slotProps || {};

  const { field, fieldState } = useController(config);
  const { ref, onChange: onFieldChange, ...fieldRest } = field;
  const { error } = fieldState;

  const changeHandler = (value: Date | null) => {
    onFieldChange(value as any);
    onChange && onChange(value);
  };

  return (
    <TimePicker
      {...rest}
      {...fieldRest}
      inputRef={ref}
      onChange={changeHandler}
      slotProps={{
        textField: () => ({
          error: Boolean(error?.message),
          helperText: error?.message,
          ...textField,
        }),
        ...restSlotProps,
      }}
    />
  );
};