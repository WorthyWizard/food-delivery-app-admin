import { create } from "zustand";

import {
  ModalState,
  ModalStateWithMutation,
  ModalTypes,
  ModalWithIdsTypes,
  MutationPayload,
  ProductCategoryModalsState,
} from "./types";

interface State extends ProductCategoryModalsState {
  openModal: (payload: ModalTypes) => void;
  closeModal: (payload: ModalTypes) => void;
  openMutationModal: (payload: MutationPayload) => void;
  closeMutationModal: (payload: ModalWithIdsTypes) => void;
}

const initialModalState: ModalState = {
  isOpen: false,
};

const initialModalWithMutationState: ModalStateWithMutation = {
  id: null,
  isOpen: false,
};

export const useProductCategoryModals = create<State>((set) => ({
  createProductCategory: initialModalState,
  deleteProductCategory: initialModalWithMutationState,
  updateProductCategory: initialModalWithMutationState,
  openModal: (name) =>
    set((state) => ({
      ...state,
      [name]: {
        isOpen: true,
      },
    })),
  closeModal: (name) =>
    set((state) => ({
      ...state,
      [name]: {
        isOpen: false,
      },
    })),
  openMutationModal: ({ name, id }) =>
    set((state) => ({
      ...state,
      [name]: {
        id,
        isOpen: true,
      },
    })),
  closeMutationModal: (name) =>
    set((state) => ({
      ...state,
      [name]: {
        id: null,
        isOpen: false,
      },
    })),
}));
