import { object, string } from "zod";

export const selectableOptionSchema = object({
  label: string(),
  value: string(),
});
