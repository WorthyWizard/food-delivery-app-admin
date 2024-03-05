import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

import { ModalsState, ModalState, ModalStateWithMutation } from "../types";

const initialModalState: ModalState = {
  isOpen: false,
};

const initialModalWithMutationState: ModalStateWithMutation = {
  id: null,
  isOpen: false,
};

const stateCreator: StateCreator<
  ModalsState,
  [["zustand/immer", never]],
  []
> = (set) => ({
  createModal: initialModalState,
  deleteModal: initialModalWithMutationState,
  updateModal: initialModalWithMutationState,
  openModal: (name) =>
    set((state) => {
      state[name] = {
        isOpen: true,
      };
    }),
  closeModal: (name) =>
    set((state) => {
      state[name] = {
        isOpen: false,
      };
    }),
  openMutationModal: ({ name, id }) =>
    set((state) => {
      state[name] = {
        id,
        isOpen: true,
      };
    }),
  closeMutationModal: (name) =>
    set((state) => {
      state[name] = {
        id: null,
        isOpen: false,
      };
    }),
});

export const createModalsStore = () =>
  create<ModalsState>()(immer(stateCreator));
