import { FC, ReactNode } from "react";
import { alpha, useTheme } from "@mui/material";

import { StyledBox, StyledMessage, StyledStack } from "./styled";
import { getMessageColorByType } from "./utils";
import { MessagesTypes } from "./types";
import { messageIcons, messages } from "./hardcoded";

type MessageOutput =
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

export const Message: FC<MessageOutput> = (props) => {
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
