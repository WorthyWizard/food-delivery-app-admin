import { FieldValues, useController } from "react-hook-form";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";

import { StyledTextField } from "../styled";
import { ControlledFormFieldProps } from "../types";

type FilteredDatePickerProps = Omit<
  DateTimePickerProps<Date>,
  "renderInput" | "value" | "onChange" | "inputRef"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends FilteredDatePickerProps,
    ControlledFormFieldProps<TFormValues> {
  onChange?: (
    value: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
}

export const FormDateTimeInput = <
  TFieldValues extends FieldValues = FieldValues
>(
  props: Props<TFieldValues>
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
    <DateTimePicker
      {...rest}
      {...fieldRest}
      inputRef={ref}
      onChange={changeHandler}
      slots={{ textField: StyledTextField }}
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
