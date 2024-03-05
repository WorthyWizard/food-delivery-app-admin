import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { AuthState } from "./types";

const stateCreator: StateCreator<AuthState, [["zustand/immer", never]], []> = (
  set,
) => ({
  isAuthenticated: false,
  token: null,
  hasHydrated: false,
  setup: (data) =>
    set((state) => {
      if (data) {
        state.token = data.accessToken;
        state.isAuthenticated = true;
      } else {
        state.token = null;
        state.isAuthenticated = false;
      }
    }),
});

export const useAuthStore = create<AuthState>()(
  persist(immer(stateCreator), {
    name: "auth",
    partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => !["setup"].includes(key)),
      ),
    onRehydrateStorage: () => (state) => {
      if (state) {
        state.hasHydrated = true;
      }
    },
  }),
);
