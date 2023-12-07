
import { MongoObjectIdField } from "@/types/mongo";

import { ProductStatuses } from "../common";

export interface CreateProduct {
  title: string;
  description: string;
  status: ProductStatuses;
  price: number;
  image: Buffer;
  rating?: number;
  discount?: number | null;
  categories: string[];
}

export type UpdateProduct = Partial<CreateProduct> & MongoObjectIdField;
