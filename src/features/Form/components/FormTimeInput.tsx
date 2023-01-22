import { TimePicker, TimePickerProps } from "@mui/x-date-pickers";
import { FieldValues, useController } from "react-hook-form";

import { HookFormFieldProps } from "../types";
import { StyledTextField } from "../styled";
import { useFormState } from "../context/FormStateContext";

type OmittedTimePickerProps = Omit<
  TimePickerProps<Date, Date>,
  "renderInput" | "value" | "onChange"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedTimePickerProps,
    HookFormFieldProps<TFormValues> {}

const FormDateInput = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, disabled, ...rest } = props;

  const { isLoading } = useFormState() || {};

  const { field, fieldState } = useController(config);

  const { ref, ...fieldRest } = field;
  const { error } = fieldState;

  return (
    <TimePicker
      disabled={isLoading || disabled}
      inputRef={ref}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          error={Boolean(error?.message)}
          helperText={error?.message}
        />
      )}
      {...rest}
      {...fieldRest}
    />
  );
};

export default FormDateInput;
