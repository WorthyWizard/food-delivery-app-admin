import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { MenuButtonItemProps } from "@/components/MenuButton/types";
import { ProductEditOptionTypes } from "./types";

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
