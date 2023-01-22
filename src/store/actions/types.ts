import { ModalTypes, ModalWithIdsTypes } from "@/types/modals";

export interface OpenModalAction {
  name: ModalTypes;
}

export interface OpenModalWithMutationAction {
  id: string;
  name: ModalWithIdsTypes;
}
