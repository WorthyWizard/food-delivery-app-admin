import {
  CircularProgress,
  Modal as MuiModal,
  ModalProps,
  Stack,
} from "@mui/material";
import { FC, ReactNode } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { ModalInnerWrapper, StyledIconButton } from "./styled";

interface Props extends Omit<ModalProps, "children"> {
  children: ReactNode | ReactNode[];
}

export const Modal: FC<Props> = (props) => {
  const { onClose, children, style, sx, ...rest } = props;

  const closeHandler = () => {
    onClose && onClose({}, "backdropClick");
  };

  return (
    <MuiModal onClose={onClose} {...rest}>
      <ModalInnerWrapper style={style} sx={{ borderRadius: 2, ...sx }}>
        <StyledIconButton onClick={closeHandler}>
          <CloseRoundedIcon />
        </StyledIconButton>
        <Stack height="100%">{children}</Stack>
      </ModalInnerWrapper>
    </MuiModal>
  );
};
