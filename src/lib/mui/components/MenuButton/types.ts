import { MouseEvent, ReactElement } from "react";

export interface MenuButtonItemProps<T extends string = string> {
  type: T;
  label: string;
  Icon?: ReactElement;
}

export type MenuButtonClickHandler = (
  event: MouseEvent<HTMLLIElement>,
  selectedValue: number,
) => void;
