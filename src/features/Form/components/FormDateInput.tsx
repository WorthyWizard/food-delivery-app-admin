import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps } from "../types";
import { StyledTextField } from "../styled";

type OmittedDatePickerProps = Omit<
  DatePickerProps<Date, Date>,
  "renderInput" | "value" | "onChange" | "inputRef"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedDatePickerProps,
    HookFormFieldProps<TFormValues> {
  onChange?: (
    value: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
}

export const FormDateInput = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, onChange, ...rest } = props;

  const controller = useController(config);
  const { ref, onChange: onFieldChange, ...fieldRest } = controller.field;
  const { error } = controller.fieldState;

  const changeHandler = (
    value: Date | null,
    keyboardInputValue?: string | undefined
  ) => {
    onFieldChange(value);
    onChange && onChange(value, keyboardInputValue);
  };

  return (
    <DatePicker
      {...rest}
      {...fieldRest}
      inputRef={ref}
      onChange={changeHandler}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          error={Boolean(error?.message)}
          helperText={error?.message}
        />
      )}
    />
  );
};
