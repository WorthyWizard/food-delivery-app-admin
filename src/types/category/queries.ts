import { MongoObjectIdField } from "../mongo";

export interface Category extends MongoObjectIdField {
  name: string;
  slug: string;
}
