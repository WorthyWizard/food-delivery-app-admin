import { MongoObjectId } from "@/types/mongo";

export type ModalTypes = "createProduct";

export type ModalWithIdsTypes = "updateProduct" | "deleteProduct";

export interface ModalState {
  isOpen: boolean;
}

export interface ModalStateWithMutation extends ModalState {
  id: MongoObjectId | null;
}

export interface ProductModalsState {
  createProduct: ModalState;
  updateProduct: ModalStateWithMutation;
  deleteProduct: ModalStateWithMutation;
}

export interface MutationPayload {
  name: ModalWithIdsTypes;
  id: MongoObjectId | null;
}
