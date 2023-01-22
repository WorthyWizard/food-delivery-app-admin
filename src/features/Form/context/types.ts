import { ReactNode } from "react";

export interface FormStateProviderProps {
  children?: ReactNode;
  isLoading?: boolean;
}

export interface FormStateContextValue {
  isLoading?: boolean;
}
