import { ReactElement } from "react";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  IconButton,
  IconButtonProps,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface Props extends ListItemButtonProps<typeof Link> {
  icon?: ReactElement;
  primary: string;
  to: string;
  hasChildren?: boolean;
  open?: boolean;
  itemActionProps?: IconButtonProps;
}

export const ListItemLink = (props: Props) => {
  const { icon, primary, to, sx, open, itemActionProps, hasChildren, ...rest } =
    props;

  return (
    <ListItemButton
      disableRipple
      component={Link}
      to={to}
      sx={{ borderRadius: 2, ...sx }}
      {...rest}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
      {hasChildren && (
        <IconButton size="small" {...itemActionProps}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      )}
    </ListItemButton>
  );
};
