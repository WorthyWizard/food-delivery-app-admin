import { MongoObjectIdField } from "../mongo";

export interface User extends MongoObjectIdField {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
