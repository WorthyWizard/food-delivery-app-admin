import { GridColDef } from "@mui/x-data-grid";

import { createActionsColumn } from "@/common/grid";

import { useProductCategoryModals } from "../store";
import { ProductCategory } from "../types";

export const categoriesColumns: GridColDef<ProductCategory>[] = [
  {
    field: "name",
    width: 200,
  },
  {
    field: "slug",
    width: 200,
  },
  createActionsColumn({
    store: useProductCategoryModals,
  }),
];
