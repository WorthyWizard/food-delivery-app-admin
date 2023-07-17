import { GridColDef } from "@mui/x-data-grid";

import { ProductCategoryActions } from "../components";
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
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    disableColumnMenu: true,
    hideable: false,
    width: 100,
    renderCell: ({ id }) => {
      return <ProductCategoryActions productId={id as string} />;
    },
  },
];
