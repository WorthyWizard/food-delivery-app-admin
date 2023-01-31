import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllModals, ModalTypes, ModalWithIdsTypes } from "@/types/modals";
import { OpenModalAction, OpenModalWithMutationAction } from "../actions/types";

interface ModalState {
  isOpen: boolean;
}

interface ModalStateWithMutation extends ModalState {
  id: string | null;
}

const initialModalState: ModalState = {
  isOpen: false,
};

const initialModalWithMutationState: ModalStateWithMutation = {
  id: null,
  isOpen: false,
};

const initialState = {
  createProduct: initialModalState,
  createUser: initialModalState,
  deleteProduct: initialModalWithMutationState,
  editProduct: initialModalWithMutationState,
  editUser: initialModalWithMutationState,
  deleteUser: initialModalWithMutationState,
};

export const modalsSlice = createSlice({
  initialState,
  name: "modalsSlice",
  reducers: {
    openModal: (state, { payload }: PayloadAction<ModalTypes>) => {
      state[payload] = {
        isOpen: true,
      };
    },
    openMutationModal: (
      state,
      { payload }: PayloadAction<OpenModalWithMutationAction>
    ) => {
      state[payload.name] = {
        id: payload.id,
        isOpen: true,
      };
    },
    closeModal: (state, { payload }: PayloadAction<ModalTypes>) => {
      state[payload] = {
        isOpen: false,
      };
    },
    closeMutationModal: (
      state,
      { payload }: PayloadAction<ModalWithIdsTypes>
    ) => {
      state[payload] = {
        id: null,
        isOpen: false,
      };
    },
  },
});
