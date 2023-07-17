import { MouseEventHandler } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { IconButton, StackProps } from "@mui/material";

import { ControlsWrapper } from "./styled";

interface Props {
  wrapperProps?: StackProps;
  onEditClick?: MouseEventHandler<HTMLButtonElement>;
}

export const EditControls = (props: Props) => {
  const { wrapperProps, onEditClick } = props;

  return (
    <ControlsWrapper {...wrapperProps}>
      <IconButton onClick={onEditClick} sx={{ color: "white" }}>
        <EditRoundedIcon />
      </IconButton>
    </ControlsWrapper>
  );
};
