import { array, coerce, literal, object, string, z } from "zod";

import { selectableOptionSchema } from "@/validation";

export const EditProductSchema = object({
  title: string().optional(),
  description: string().optional(),
  status: string().optional(),
  price: coerce
    .number()
    .positive()
    .or(literal(""))
    .refine((value) => value !== ""),
  rating: coerce.number().min(1).max(5).or(literal("")),
  discount: coerce.number().min(1).max(100).or(literal("")),
  categories: array(selectableOptionSchema).min(1).optional(),
});

export type EditProductFormData = z.infer<typeof EditProductSchema>;
