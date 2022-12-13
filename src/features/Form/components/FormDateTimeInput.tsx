import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps } from "../types";
import { StyledTextField } from "../styled";

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
  const { controllerConfig, ...rest } = props;

  const { field, fieldState } = useController(controllerConfig);
  const { ref, ...fieldRest } = field;
  const { error } = fieldState;

  return (
    <DateTimePicker
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
