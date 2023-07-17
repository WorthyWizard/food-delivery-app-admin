import { MouseEvent, ReactElement } from "react";

export interface MenuButtonItemProps<L extends string = string> {
  label: L;
  Icon?: ReactElement;
}

export type MenuButtonClickHandler = (
  event: MouseEvent<HTMLLIElement>,
  selectedValue: number
) => void;
