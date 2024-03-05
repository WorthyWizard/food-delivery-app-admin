import { ProductStatuses } from "../common";

export interface CreateProduct {
  title: string;
  description: string;
  status: ProductStatuses;
  price: number;
  image: File | null;
  rating?: number | null;
  discount?: number | null;
  categories: number[];
}

export type UpdateProduct = Partial<CreateProduct>;
