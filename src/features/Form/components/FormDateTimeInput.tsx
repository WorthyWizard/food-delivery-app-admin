import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { FieldValues, useController } from "react-hook-form";

import { HookFormFieldProps } from "../types";
import { StyledTextField } from "../styled";
import { useFormState } from "../context/FormStateContext";

type OmittedDatePickerProps = Omit<
  DateTimePickerProps<Date, Date>,
  "renderInput" | "value" | "onChange"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedDatePickerProps,
    HookFormFieldProps<TFormValues> {}

const FormDateTimeInput = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, disabled, ...rest } = props;

  const { isLoading } = useFormState() || {};

  const { field, fieldState } = useController(config);

  const { ref, ...fieldRest } = field;
  const { error } = fieldState;

  return (
    <DateTimePicker
      disabled={isLoading || disabled}
      inputRef={ref}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          helperText={error?.message}
          error={Boolean(error?.message)}
        />
      )}
      {...rest}
      {...fieldRest}
    />
  );
};

export default FormDateTimeInput;
