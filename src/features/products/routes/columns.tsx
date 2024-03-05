import { Avatar, Rating, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { createActionsColumn } from "@/common/grid";
import { productsEndpointsMap } from "@/router";

import { useProductModals } from "../store";
import { Product } from "../types/queries";

export const productColumns: GridColDef<Product>[] = [
  {
    field: "title",
    headerName: "Title",
    width: 400,
    renderCell: ({ value, row }) => (
      <Stack direction="row" gap={1} alignItems="center">
        <Avatar slotProps={{ img: { draggable: false } }} src={row.imageUrl} />
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
  createActionsColumn({
    store: useProductModals,
    options: {
      navigations: {
        edit: ({ id }) => `${id}/${productsEndpointsMap.EDIT}`,
      },
    },
  }),
];
