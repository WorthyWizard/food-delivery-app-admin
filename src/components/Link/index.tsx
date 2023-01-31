import { FC, ReactElement } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemButtonProps,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Props extends ListItemButtonProps<typeof Link> {
  icon?: ReactElement;
  primary: string;
  to: string;
}

export const ListItemLink: FC<Props> = (props) => {
  const { icon, primary, to, sx, ...rest } = props;

  return (
    <ListItemButton
      component={Link}
      to={to}
      sx={{ borderRadius: 2, ...sx }}
      {...rest}
    >
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};
