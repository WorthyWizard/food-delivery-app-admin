import { ProductCategory } from "@/features/product-categories";
import { MongoObjectIdField } from "@/types/mongo";

import { ProductStatuses } from "../common";

export interface Product extends MongoObjectIdField {
  title: string;
  description: string;
  price: number;
  totalPrice: number;
  rating: number | null;
  discount: number | null;
  categories: ProductCategory[];
  status: ProductStatuses;
  imageName: string;
  imageUrl: string;
}
