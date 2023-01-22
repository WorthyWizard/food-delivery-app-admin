import { MongoObjectIdField } from "../mongo";

export interface CreateProduct {
  title: string;
  description: string;
  price: number;
  image: Buffer;
  rating?: number;
  discount?: number | null;
}

export type UpdateProduct = Partial<CreateProduct> & MongoObjectIdField;
