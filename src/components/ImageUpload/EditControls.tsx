import { FC, MouseEventHandler } from "react";
import { Stack, IconButton, StackProps } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { ControlsWrapper } from "./styled";

interface Props {
  wrapperProps?: StackProps;
  onEditClick?: MouseEventHandler<HTMLButtonElement>;
  onDeleteClick?: MouseEventHandler<HTMLButtonElement>;
}

const EditControls: FC<Props> = (props) => {
  const { wrapperProps, onDeleteClick, onEditClick } = props;

  return (
    <ControlsWrapper {...wrapperProps}>
      <IconButton onClick={onEditClick} sx={{ color: "white" }}>
        <EditRoundedIcon fontSize="large" />
      </IconButton>
      <IconButton onClick={onDeleteClick} sx={{ color: "white" }}>
        <CloseRoundedIcon fontSize="large" />
      </IconButton>
    </ControlsWrapper>
  );
};

export default EditControls;
