import { ReactNode } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Modal as MuiModal, ModalProps, Stack } from "@mui/material";

import { ModalInnerWrapper, StyledIconButton } from "./styled";

interface Props extends Omit<ModalProps, "children"> {
  children: ReactNode | ReactNode[];
}

export const Modal = (props: Props) => {
  const { onClose, children, style, sx, ...rest } = props;

  const closeHandler = () => {
    onClose && onClose({}, "backdropClick");
  };

  return (
    <MuiModal onClose={onClose} {...rest}>
      <ModalInnerWrapper
        style={style}
        sx={{ maxWidth: 450, position: "relative", ...sx }}
      >
        <StyledIconButton size="small" onClick={closeHandler}>
          <CloseRoundedIcon fontSize="small" />
        </StyledIconButton>
        <Stack height="100%">{children}</Stack>
      </ModalInnerWrapper>
    </MuiModal>
  );
};
