import { Avatar, Rating, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { getProductImage } from "@/api";

import { ProductActions } from "../components";
import { Product } from "../types/queries";

export const productColumns: GridColDef<Product>[] = [
  {
    field: "title",
    headerName: "Title",
    width: 350,
    renderCell: ({ id, value }) => {
      return (
        <Stack direction="row" gap={1} alignItems="center">
          <Avatar src={getProductImage(id as string)} />
          <Typography variant="body2">{value}</Typography>
        </Stack>
      );
    },
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
