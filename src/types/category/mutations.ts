import { MongoObjectIdField } from "../mongo";

export interface CreateCategory {
  name: string;
  slug: string;
}

export type UpdateCategory = Partial<CreateCategory> & MongoObjectIdField;
