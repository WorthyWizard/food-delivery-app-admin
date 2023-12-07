import { SelectableOption } from "@/lib/react-hook-form";

import { ACTIVE, DRAFT, HIDDEN } from "../common";

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
