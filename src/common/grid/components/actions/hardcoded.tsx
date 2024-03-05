import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { MenuButtonItemProps } from "@/lib/mui";

import { GridActionTypes } from "./types";

export const menuButtonOptions: MenuButtonItemProps<GridActionTypes>[] = [
  {
    type: "edit",
    label: "Edit",
    Icon: <EditIcon />,
  },
  {
    type: "delete",
    label: "Delete",
    Icon: <DeleteIcon />,
  },
];
