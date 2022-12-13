import {
  Control,
  FieldValues,
  SubmitHandler,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";

export type SelectableOption = {
  value: string;
  label: string;
};

interface ControllerConfig<TValues extends FieldValues = FieldValues>
  extends UseControllerProps<TValues> {
  control: Control<TValues>;
}

export interface HookFormFieldProps<TValues extends FieldValues = FieldValues> {
  controllerConfig: ControllerConfig<TValues>;
}

export interface FormReturnValues<TFormValues extends FieldValues = FieldValues>
  extends UseFormReturn<TFormValues> {}

export interface FormProps<TFormValues extends FieldValues = FieldValues> {
  form: FormReturnValues<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  /** A required prop which should contain all the buttons to control the form from the parent component */
  controls: JSX.Element;
}
