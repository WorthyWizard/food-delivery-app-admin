import { TimePicker, TimePickerProps } from "@mui/x-date-pickers";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps } from "../types";
import { StyledTextField } from "../styled";

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
  const { controllerConfig, ...rest } = props;

  const { field, fieldState } = useController(controllerConfig);
  const { ref, ...fieldRest } = field;
  const { error } = fieldState;

  return (
    <TimePicker
      {...rest}
      {...fieldRest}
      inputRef={ref}
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

export default FormDateInput;
