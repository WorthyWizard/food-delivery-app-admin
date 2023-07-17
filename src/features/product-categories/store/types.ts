import { MongoObjectId } from "@/types/mongo";

export type ModalTypes = "createProductCategory";

export type ModalWithIdsTypes =
  | "updateProductCategory"
  | "deleteProductCategory";

export interface ModalState {
  isOpen: boolean;
}

export interface ModalStateWithMutation extends ModalState {
  id: MongoObjectId | null;
}

export interface ProductCategoryModalsState {
  createProductCategory: ModalState;
  updateProductCategory: ModalStateWithMutation;
  deleteProductCategory: ModalStateWithMutation;
}

export interface MutationPayload {
  name: ModalWithIdsTypes;
  id: MongoObjectId | null;
}
