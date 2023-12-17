import { FieldValues, useController } from "react-hook-form";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";

import { ControlledFormFieldProps } from "../types";

type FilteredDatePickerProps = Omit<
  DatePickerProps<Date>,
  "renderInput" | "value" | "onChange" | "inputRef"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends FilteredDatePickerProps,
    ControlledFormFieldProps<TFormValues> {
  onChange?: (
    value: Date | null,
    keyboardInputValue?: string | undefined,
  ) => void;
}

export const FormDateInput = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>,
) => {
  const { config, onChange, slotProps, ...rest } = props;

  const { textField, ...restSlotProps } = slotProps || {};

  const controller = useController(config);
  const { ref, onChange: onFieldChange, ...fieldRest } = controller.field;
  const { error } = controller.fieldState;

  const changeHandler = (value: Date | null) => {
    onFieldChange(value as any);
    onChange && onChange(value);
  };

  return (
    <DatePicker
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
