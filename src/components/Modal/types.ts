import { ModalProps as MuiModalProps } from "@mui/material";

export type ModalProps = Omit<MuiModalProps, "children">;
