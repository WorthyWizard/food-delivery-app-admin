import { StoreApi, UseBoundStore } from "zustand";

export type ModalTypes = "createModal";

export type ModalWithIdsTypes = "updateModal" | "deleteModal";

export interface ModalState {
  isOpen: boolean;
}

export interface ModalStateWithMutation extends ModalState {
  id: number | null;
}

export interface MutationPayload {
  name: ModalWithIdsTypes;
  id: number | null;
}

export interface State {
  createModal: ModalState;
  updateModal: ModalStateWithMutation;
  deleteModal: ModalStateWithMutation;
}

export interface Actions {
  openModal: (payload: ModalTypes) => void;
  closeModal: (payload: ModalTypes) => void;
  openMutationModal: (payload: MutationPayload) => void;
  closeMutationModal: (payload: ModalWithIdsTypes) => void;
}

export type ModalsState = State & Actions;

export type ModalsStore = UseBoundStore<StoreApi<ModalsState>>;
