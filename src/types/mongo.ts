export type MongoObjectId = string;

export interface MongoObjectIdField {
  _id: MongoObjectId;
}

export interface MongoAdditionalFields extends MongoObjectIdField {
  __v: number;
}
