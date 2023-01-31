import { CircularProgress, StackProps } from "@mui/material";
import { FC } from "react";

import { OverlayWrapper } from "./styled";

interface Props extends StackProps {}

export const Overlay: FC<Props> = (props) => {
  return (
    <OverlayWrapper {...props}>
      <CircularProgress size={26} />
    </OverlayWrapper>
  );
};
