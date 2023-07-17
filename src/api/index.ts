import { API_URL } from "@/config";
import { MongoObjectId } from "@/types/mongo";

export const getProductImage = (id: MongoObjectId) => {
  return `${API_URL}/products/${id}/product-image`;
};
