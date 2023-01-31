import { SelectableOption } from "@/features/form";
import { number, object, SchemaOf, string } from "yup";
import { validationMessages } from "./schemaMessages";

export const yupNumberOptional = number()
  .typeError(validationMessages.typeNumber)
  .nullable()
  .transform((value: string, originalValue: string | number) => {
    if (typeof originalValue === "string") {
      return originalValue?.trim() === "" ? null : value;
    }
    return value;
  })
  .optional();

export const yupNumberRequired = number()
  .typeError(validationMessages.typeNumber)
  .transform((value: string, originalValue: string | number) => {
    if (typeof originalValue === "string") {
      return originalValue?.trim() === "" ? null : value;
    }
    return value;
  })
  .required(validationMessages.required);

export const selectableOption: SchemaOf<SelectableOption> = object().shape({
  label: string().required(),
  value: string().required(),
});
