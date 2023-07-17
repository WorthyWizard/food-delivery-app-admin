import { ReactNode } from "react";
import { alpha, useTheme } from "@mui/material";

import { messageIcons, messages } from "./hardcoded";
import { StyledBox, StyledMessage, StyledStack } from "./styled";
import { MessagesTypes } from "./types";
import { getMessageColorByType } from "./utils";

type Props =
  | {
      type: MessagesTypes;
      children?: never;
      icon?: never;
    }
  | {
      type?: never;
      children: ReactNode;
      icon?: JSX.Element;
    };

export const Message = (props: Props) => {
  const { children, type, icon } = props;

  const theme = useTheme();

  let iconRender: JSX.Element | null = null;

  if (type) {
    iconRender = <StyledBox>{messageIcons[type]}</StyledBox>;
  } else if (icon) {
    iconRender = <StyledBox>{icon}</StyledBox>;
  }

  return (
    <StyledStack
      sx={{
        bgcolor: type
          ? getMessageColorByType(type, theme)
          : alpha(theme.palette.primary.main, 0.1),
      }}
    >
      {iconRender}
      <StyledMessage>{type ? messages[type] : children}</StyledMessage>
    </StyledStack>
  );
};
