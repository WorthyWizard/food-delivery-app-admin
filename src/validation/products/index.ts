import { SchemaOf, object, string } from "yup";
import {
  CreateProductFormData,
  EditProductFormData,
} from "@/types/products/formData";
import validationMessages from "../schemaMessages";
import { yupNumberOptional, yupNumberRequired } from "../common";

export const createProductSchema: SchemaOf<CreateProductFormData> =
  object().shape({
    description: string().required(validationMessages.required),
    discount: yupNumberOptional
      .moreThan(-1, validationMessages.positive)
      .max(100),
    price: yupNumberRequired.positive(validationMessages.positive),
    rating: yupNumberOptional.positive(validationMessages).max(5),
    title: string().required(validationMessages.required),
  });

export const editProductSchema: SchemaOf<EditProductFormData> = object().shape({
  description: string().optional(),
  discount: yupNumberOptional
    .moreThan(-1, validationMessages.positive)
    .max(100),
  price: yupNumberOptional.positive(validationMessages.positive),
  rating: yupNumberOptional.positive(validationMessages.positive).max(5),
  title: string().optional(),
});
