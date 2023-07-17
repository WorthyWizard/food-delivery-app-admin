import { alpha, Theme } from "@mui/material";

import { MessagesTypes } from "./types";

export const getMessageColorByType = (
  type: MessagesTypes,
  theme: Theme
): string => {
  const { palette } = theme;

  switch (type) {
    case "GENERAL_FAILURE":
      return alpha(palette.error.main, 0.1);
  }
};
