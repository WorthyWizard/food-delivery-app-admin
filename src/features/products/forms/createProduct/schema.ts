import { array, coerce, literal, object, string, z } from "zod";

import { selectableOptionSchema } from "@/validation";

export const CreateProductSchema = object({
  title: string().min(5).max(25),
  description: string().min(5).max(500),
  price: coerce
    .number()
    .positive()
    .or(literal(""))
    .refine((value) => value !== ""),
  rating: coerce.number().min(1).max(5).or(literal("")),
  discount: coerce.number().min(1).max(100).or(literal("")),
  categories: array(selectableOptionSchema).min(1),
});

export type CreateProductFormData = z.infer<typeof CreateProductSchema>;
