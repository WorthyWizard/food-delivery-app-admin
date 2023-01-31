import { Category } from "../category/queries";
import { MongoObjectIdField } from "../mongo";

export interface Product extends MongoObjectIdField {
  title: string;
  description: string;
  price: number;
  totalPrice: number;
  rating: number | null;
  discount: number | null;
  categories: Category[];
}
