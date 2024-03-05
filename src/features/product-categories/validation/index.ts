import { object, string, z } from "zod";

export const CreateProductCategorySchema = object({
  name: string().max(15),
  slug: string().max(15),
});

export type CreateProductCategoryFormData = z.infer<
  typeof CreateProductCategorySchema
>;

export const UpdateProductCategorySchema =
  CreateProductCategorySchema.partial();

export type UpdateProductCategoryFormData = z.infer<
  typeof UpdateProductCategorySchema
>;
