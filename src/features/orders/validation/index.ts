import { number, object, string, z } from "zod";

export const OrderProductSchema = object({
  id: number(),
  title: string(),
  description: string(),
  price: number(),
  quantity: number().min(1),
});

export type OrderProductFormData = z.infer<typeof OrderProductSchema>;

export const EditOrderSchema = object({
  status: string(),
});

export type EditOrderFormData = z.infer<typeof EditOrderSchema>;
