import { FC, MouseEvent, MouseEventHandler, useState } from "react";
import { IconButton, IconButtonProps, MenuProps } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { StyledMenu } from "./styled";
import { MenuButtonClickHandler, MenuButtonItemProps } from "./types";

interface Props extends Omit<IconButtonProps, "onClick"> {
  menuItems: MenuButtonItemProps[];
  menuProps?: MenuProps;
  onClick?: MenuButtonClickHandler;
}

export const MenuButton: FC<Props> = (props) => {
  const { menuItems, menuProps, onClick, ...rest } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick =
    (index: number): MouseEventHandler<HTMLLIElement> =>
    (event) => {
      onClick && onClick(event, index);
      handleClose();
    };

  return (
    <div>
      <IconButton onClick={handleClick} {...rest}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...menuProps}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={onMenuItemClick(index)} disableRipple>
            {item?.Icon}
            {item.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};
