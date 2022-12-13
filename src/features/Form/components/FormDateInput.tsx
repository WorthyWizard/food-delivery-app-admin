import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { FieldValues, useController } from "react-hook-form";
import { HookFormFieldProps } from "../types";
import { StyledTextField } from "../styled";

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
  const { controllerConfig, ...rest } = props;

  const controller = useController(controllerConfig);
  const { ref, ...fieldRest } = controller.field;
  const { error } = controller.fieldState;

  return (
    <DatePicker
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
