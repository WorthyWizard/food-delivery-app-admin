import { MongoAdditionalFields } from "../mongo";

export interface Product extends MongoAdditionalFields {
  title: string;
  description: string;
  price: number;
  totalPrice: number;
  rating: number | null;
  discount: number | null;
}
