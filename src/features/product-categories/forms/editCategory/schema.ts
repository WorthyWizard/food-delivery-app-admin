import { object, string, z } from "zod";

export const UpdateProductCategorySchema = object({
  name: string().max(15).optional(),
  slug: string().max(15).optional(),
});

export type UpdateProductCategoryFormData = z.infer<
  typeof UpdateProductCategorySchema
>;
