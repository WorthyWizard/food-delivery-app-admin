import { MongoObjectIdField } from "@/types/mongo";

export interface CreateProductCategory {
  name: string;
  slug: string;
}

export type UpdateProductCategory = Partial<CreateProductCategory> &
  MongoObjectIdField;
