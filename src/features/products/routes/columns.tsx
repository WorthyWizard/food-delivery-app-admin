import { Avatar, Rating, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { ProductActions } from "../components";
import { Product } from "../types/queries";

export const productColumns: GridColDef<Product>[] = [
  {
    field: "title",
    headerName: "Title",
    width: 400,
    renderCell: ({ value, row }) => (
      <Stack direction="row" gap={1} alignItems="center">
        <Avatar imgProps={{ draggable: false }} src={row.imageUrl} />
        <Typography variant="body2">{value}</Typography>
      </Stack>
    ),
  },
  { field: "price", headerName: "Price", width: 150 },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 150,
  },
  {
    field: "discount",
    headerName: "Discount",
    width: 150,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 175,
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
    width: 150,
    renderCell: ({ id }) => <ProductActions productId={id as string} />,
  },
];
