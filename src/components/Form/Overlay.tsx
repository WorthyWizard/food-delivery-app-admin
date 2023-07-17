import { CircularProgress, StackProps } from "@mui/material";

import { OverlayWrapper } from "./styled";

interface Props extends StackProps {}

export const Overlay = (props: Props) => {
  return (
    <OverlayWrapper {...props}>
      <CircularProgress size={26} />
    </OverlayWrapper>
  );
};
