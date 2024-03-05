import { array, coerce, custom, literal, object, string, z } from "zod";

import { selectableOptionSchema } from "@/validation";

import { MAX_IMAGE_SIZE } from "./constants";

export const ProductSchema = object({
  title: string().min(5).max(50),
  description: string().min(5).max(500),
  status: string(),
  price: coerce
    .number()
    .positive()
    .or(literal(""))
    .refine((value) => value !== ""),
  rating: coerce.number().min(0).max(5).or(literal("")),
  discount: coerce.number().min(1).max(100).or(literal("")),
  categories: array(selectableOptionSchema).min(1),
  image: custom<File | null>()
    .or(literal(""))
    .superRefine((value, ctx) => {
      if (value === "") return true;

      if (value instanceof File) {
        if (value.size > MAX_IMAGE_SIZE * 1024 * 1024) {
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `The maximum image size is ${MAX_IMAGE_SIZE}MB`,
          });
        } else if (!value.type?.startsWith("image")) {
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Only images are allowed to be sent",
          });
        }
      } else {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid file",
        });
      }
    }),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
