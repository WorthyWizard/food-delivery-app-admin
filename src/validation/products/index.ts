import { SchemaOf, object, string, array } from "yup";
import {
  CreateProductFormData,
  EditProductFormData,
} from "@/types/product/forms";
import { validationMessages } from "../schemaMessages";
import {
  selectableOption,
  yupNumberOptional,
  yupNumberRequired,
} from "../common";

export const createProductSchema: SchemaOf<CreateProductFormData> =
  object().shape({
    description: string().required(validationMessages.required),
    discount: yupNumberOptional
      .moreThan(-1, validationMessages.positive)
      .max(100),
    price: yupNumberRequired.positive(validationMessages.positive),
    rating: yupNumberOptional.positive(validationMessages).max(5),
    title: string().required(validationMessages.required),
    categories: array()
      .of(selectableOption)
      .min(1, "At least one category must be selected!"),
  });

export const editProductSchema: SchemaOf<EditProductFormData> = object().shape({
  description: string().optional(),
  discount: yupNumberOptional
    .moreThan(-1, validationMessages.positive)
    .max(100),
  price: yupNumberOptional.positive(validationMessages.positive),
  rating: yupNumberOptional.positive(validationMessages.positive).max(5),
  title: string().optional(),
  categories: array()
    .of(selectableOption)
    .min(1, "At least one category must be selected!")
    .optional(),
});
