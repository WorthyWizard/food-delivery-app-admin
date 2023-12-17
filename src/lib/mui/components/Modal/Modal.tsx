import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  BoxProps,
  LinearProgress,
  Modal as MuiModal,
  ModalProps,
  Stack,
  StackProps,
  TypographyProps,
} from "@mui/material";

import { Heading, ModalInnerWrapper, StyledIconButton } from "./styled";

interface Props extends Omit<ModalProps, "children"> {
  title?: string;
  children: ReactNode | ReactNode[];
  isLoading?: boolean;
  contentWrapperProps?: StackProps;
  modalInnerProps?: BoxProps;
  titleProps?: TypographyProps;
}

export const Modal = (props: Props) => {
  const {
    open,
    onClose,
    children,
    isLoading,
    contentWrapperProps,
    title,
    titleProps,
    ...rest
  } = props;

  const closeHandler = () => {
    onClose && onClose({}, "backdropClick");
  };

  return (
    <MuiModal open={open} onClose={onClose}>
      <ModalInnerWrapper maxWidth={450} {...rest}>
        {isLoading && (
          <LinearProgress
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px",
            }}
          />
        )}
        <StyledIconButton size="small" onClick={closeHandler}>
          <CloseIcon fontSize="small" />
        </StyledIconButton>
        {title && <Heading {...titleProps}>{title}</Heading>}
        <Stack height="100%" {...contentWrapperProps}>
          {children}
        </Stack>
      </ModalInnerWrapper>
    </MuiModal>
  );
};
