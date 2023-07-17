import { MongoObjectIdField } from "@/types/mongo";

export interface ProductCategory extends MongoObjectIdField {
  name: string;
  slug: string;
}
