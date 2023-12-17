import { SelectableOption } from "@/features/form";

import { ACTIVE, DRAFT, HIDDEN } from "../../common";

export const statusOptions: SelectableOption[] = [
  {
    label: "Active",
    value: String(ACTIVE),
  },
  {
    label: "Draft",
    value: String(DRAFT),
  },
  {
    label: "Hidden",
    value: String(HIDDEN),
  },
];
