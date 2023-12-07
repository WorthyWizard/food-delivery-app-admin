import {
  FieldValues,
  UseControllerProps,
  UseFormProps as UseHookFormProps,
} from "react-hook-form";
import { ZodType } from "zod";

export type FilteredUseFormProps<
  TFormValues extends FieldValues = FieldValues
> = Omit<UseHookFormProps<TFormValues>, "resolver">;

export interface UseFormProps<TFormValues extends FieldValues = FieldValues>
  extends FilteredUseFormProps<TFormValues> {
  validationSchema: ZodType;
}

export interface ControlledFormFieldProps<
  TValues extends FieldValues = FieldValues
> {
  config: UseControllerProps<TValues>;
}

export interface SelectableOption<T extends string = string> {
  label: T;
  value: string;
}
