import { yupResolver } from "@hookform/resolvers/yup";
import {
  FieldValues,
  useForm as useReactHookForm,
  UseFormProps,
} from "react-hook-form";
import { AnyObjectSchema } from "yup";
import { FormReturnValues } from "../types";

type OmittedUseFormProps<TFormValues extends FieldValues = FieldValues> = Omit<
  UseFormProps<TFormValues>,
  "resolver"
>;

export interface Props<TFormValues extends FieldValues = FieldValues>
  extends OmittedUseFormProps<TFormValues> {
  validationSchema: AnyObjectSchema;
}

const useForm = <TFormValues extends FieldValues = FieldValues>(
  config: Props<TFormValues>
): FormReturnValues<TFormValues> => {
  const { validationSchema, ...rest } = config;

  const hookForm = useReactHookForm<TFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    ...rest,
  });

  return hookForm;
};

export default useForm;
