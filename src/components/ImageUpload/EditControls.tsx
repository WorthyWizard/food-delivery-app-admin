import { FC, MouseEventHandler } from "react";
import { IconButton, StackProps } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import { ControlsWrapper } from "./styled";

interface Props {
  wrapperProps?: StackProps;
  onEditClick?: MouseEventHandler<HTMLButtonElement>;
}

export const EditControls: FC<Props> = (props) => {
  const { wrapperProps, onEditClick } = props;

  return (
    <ControlsWrapper {...wrapperProps}>
      <IconButton onClick={onEditClick} sx={{ color: "white" }}>
        <EditRoundedIcon />
      </IconButton>
    </ControlsWrapper>
  );
};
