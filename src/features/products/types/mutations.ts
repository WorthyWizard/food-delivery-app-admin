import { MongoObjectIdField } from "../../../types/mongo";

export interface CreateProduct {
  title: string;
  description: string;
  price: number;
  image: Buffer;
  rating?: number;
  discount?: number | null;
  categories: string[];
}

export type UpdateProduct = Partial<CreateProduct> & MongoObjectIdField;
