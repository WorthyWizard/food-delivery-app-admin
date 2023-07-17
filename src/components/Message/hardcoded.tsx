import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { MessagesTypes } from "./types";

export const messageIcons: Record<MessagesTypes, JSX.Element> = {
  GENERAL_FAILURE: <ErrorOutlineIcon color="error" fontSize="large" />,
};

export const messages: Record<MessagesTypes, string> = {
  GENERAL_FAILURE:
    "Something went wrong. Check your internet connection or try again later",
};
