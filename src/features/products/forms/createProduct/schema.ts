import { array, coerce, custom, literal, object, string, z } from "zod";

import { selectableOptionSchema } from "@/validation";

export const CreateProductSchema = object({
  title: string().min(5).max(25),
  description: string().min(5).max(500),
  status: string(),
  price: coerce
    .number()
    .positive()
    .or(literal(""))
    .refine((value) => value !== ""),
  rating: coerce.number().min(1).max(5).or(literal("")),
  discount: coerce.number().min(1).max(100).or(literal("")),
  categories: array(selectableOptionSchema).min(1),
  image: custom<File>()
    .refine(
      (file) => {
        return !file || (Boolean(file) && file.size <= 10 * 1024 * 1024);
      },
      {
        message: "The profile picture must be a maximum of 10MB.",
      },
    )
    .refine(
      (file) => {
        return !file || (Boolean(file) && file.type?.startsWith("image"));
      },
      {
        message: "Only images are allowed to be sent.",
      },
    ),
});

export type CreateProductFormData = z.infer<typeof CreateProductSchema>;
