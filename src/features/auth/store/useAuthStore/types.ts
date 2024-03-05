import { Token } from "../../types";

export interface AuthStoreState {
  isAuthenticated: boolean;
  token: string | null;
  hasHydrated: boolean;
}

export interface AuthStoreActions {
  setup: (data: Token | null) => void;
}

export type AuthState = AuthStoreState & AuthStoreActions;
