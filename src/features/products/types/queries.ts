import { ProductCategory } from "@/features/product-categories";
import { MongoObjectIdField } from "@/types/mongo";

export interface Product extends MongoObjectIdField {
  title: string;
  description: string;
  price: number;
  totalPrice: number;
  rating: number | null;
  discount: number | null;
  categories: ProductCategory[];
}
