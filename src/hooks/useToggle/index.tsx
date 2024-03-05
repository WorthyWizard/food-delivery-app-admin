import { useCallback, useState } from "react";

export type ToggleHookParams<T = any> = T | null;

export interface ToggleHookHandlers<T> {
  open: (params?: ToggleHookParams<T>) => void;
  toggle: (params?: ToggleHookParams<T>) => void;
  close: () => void;
}

export interface ToggleHookValue<T> {
  flag: boolean;
  params?: ToggleHookParams<T> | null;
}

export type ToggleHookReturnValues<T> = [
  ToggleHookValue<T>,
  ToggleHookHandlers<T>,
];

export const useToggle = <T extends object>(
  value?: Partial<ToggleHookValue<T>>,
): ToggleHookReturnValues<T> => {
  const [flag, setFlag] = useState<boolean>(value?.flag ?? false);
  const [params, setParams] = useState<ToggleHookParams<T> | null>(
    value?.params ?? null,
  );

  const open = useCallback((params?: ToggleHookParams<T>) => {
    setFlag(true);

    if (params) {
      setParams(params);
    }
  }, []);

  const toggle = useCallback((params?: ToggleHookParams<T>) => {
    setFlag((prevState) => !prevState);

    if (params) {
      setParams(params);
    }
  }, []);

  const close = useCallback(() => {
    setFlag(false);

    if (params) {
      setParams(null);
    }
  }, []);

  return [
    { flag, params },
    { open, close, toggle },
  ];
};
