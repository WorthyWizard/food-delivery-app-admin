import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { FieldValues, useController } from "react-hook-form";

import { HookFormFieldProps } from "../types";
import { StyledTextField } from "../styled";
import { useFormState } from "../context/FormStateContext";

type OmittedDatePickerProps = Omit<
  DatePickerProps<Date, Date>,
  "renderInput" | "value" | "onChange"
>;

interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedDatePickerProps,
    HookFormFieldProps<TFormValues> {}

const FormDateInput = <TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>
) => {
  const { config, disabled, ...rest } = props;

  const { isLoading } = useFormState() || {};

  const controller = useController(config);

  const { ref, ...fieldRest } = controller.field;
  const { error } = controller.fieldState;

  return (
    <DatePicker
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
