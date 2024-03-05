import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import { createActionsColumn } from "@/common/grid";

import { orderStatusesNameMap } from "../common";
import { useOrderModals } from "../store";
import { Order } from "../types";

export const columns: GridColDef<Order>[] = [
  {
    field: "id",
    headerName: "Order №",
  },
  {
    field: "date",
    headerName: "Date",
    valueGetter: ({ value }) => dayjs(value).format("L LT"),
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    valueGetter: ({ row }) => orderStatusesNameMap[row.status],
    width: 150,
  },
  {
    field: "total",
    headerName: "Total Price",
  },
  createActionsColumn({
    store: useOrderModals,
    options: {
      types: ["edit"],
    },
  }),
];
