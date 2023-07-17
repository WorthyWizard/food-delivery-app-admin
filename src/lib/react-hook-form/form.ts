import {
  FieldValues,
  useForm as useHookForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UseFormProps } from "./types";

export const useForm = <TFormValues extends FieldValues = FieldValues>(
  config: UseFormProps<TFormValues>
): UseFormReturn<TFormValues> => {
  const { validationSchema, ...rest } = config;

  const hookForm = useHookForm<TFormValues>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(validationSchema),
    ...rest,
  });

  return hookForm;
};
