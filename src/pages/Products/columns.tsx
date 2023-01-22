import { Product } from "@/types/products/dataTypes";
import { Rating } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import ProductActions from "./components/ProductActions";

export const productColumns: GridColDef<Product>[] = [
  {
    field: "title",
    headerName: "Title",
    width: 350,
  },
  { field: "price", headerName: "Price", width: 100 },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 100,
  },
  {
    field: "discount",
    headerName: "Discount",
    width: 100,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 140,
    renderCell: ({ row }) => (
      <Rating readOnly value={row.rating} precision={0.1} />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    disableColumnMenu: true,
    hideable: false,
    width: 100,
    renderCell: ({ id }) => {
      return <ProductActions productId={id as string} />;
    },
  },
];
