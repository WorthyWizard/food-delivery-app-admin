import { GridRenderCellParams } from "@mui/x-data-grid";

export type GridActionTypes = "edit" | "delete";

export type GridActionNavigation = Partial<
  Record<GridActionTypes, (row: GridRenderCellParams) => string>
>;

export type GridActionHandler = Partial<
  Record<GridActionTypes, (row: GridRenderCellParams) => void>
>;

type GridActionConditionalOptions =
  | {
      navigations: GridActionNavigation;
      handlers?: GridActionHandler;
    }
  | {
      handlers: GridActionHandler;
      navigations?: never;
    }
  | {
      handlers?: never;
      navigations?: never;
    };

export type GridActionOptions = {
  types?: GridActionTypes[];
} & GridActionConditionalOptions;
