import { MongoObjectId } from "@/types/mongo";
import { API_URL } from "./constants";

export const getProductImage = (id: MongoObjectId) => {
  return `${API_URL}/products/${id}/product-image`;
};
