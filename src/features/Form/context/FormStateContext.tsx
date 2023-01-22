import { createContext, FC, useContext } from "react";
import { FormStateContextValue, FormStateProviderProps } from "./types";

export const FormStateContext = createContext<
  FormStateContextValue | undefined
>(undefined);

export const FormStateProvider: FC<FormStateProviderProps> = (props) => {
  const { children, isLoading } = props;

  return (
    <FormStateContext.Provider
      value={{
        isLoading,
      }}
    >
      {children}
    </FormStateContext.Provider>
  );
};

export const useFormState = (): FormStateContextValue | undefined => {
  const value = useContext(FormStateContext);
  return value;
};
