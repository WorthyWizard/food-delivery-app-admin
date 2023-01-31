import { StackProps } from "@mui/material";
import {
  Control,
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";

export type SelectableOption = {
  value: string;
  label: string;
};

interface Config<TValues extends FieldValues = FieldValues>
  extends UseControllerProps<TValues> {
  control: Control<TValues>;
}

export interface HookFormFieldProps<TValues extends FieldValues = FieldValues> {
  config: Config<TValues>;
}

export interface FormReturnValues<
  TFormValues extends FieldValues = FieldValues,
  TContext = any
> extends UseFormReturn<TFormValues, TContext> {}

export interface FormProps extends StackProps<"form"> {}
