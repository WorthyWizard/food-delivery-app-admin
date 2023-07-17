import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { MenuButtonItemProps } from "@/lib/mui";

import { ProductEditOptionTypes } from "./types/common";

export const menuButtonOptions: MenuButtonItemProps<ProductEditOptionTypes>[] =
  [
    {
      label: "Edit",
      Icon: <EditIcon />,
    },
    {
      label: "Delete",
      Icon: <DeleteIcon />,
    },
  ];
