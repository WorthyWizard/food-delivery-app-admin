import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import { ListItemLink } from "../Link";
import { StyledList } from "./styled";
import { useRouteMatch } from "@/hooks";
import * as endpoints from "@/router/endpointConstants";

export const Navigation = () => {
  const routeMatch = useRouteMatch(Object.values(endpoints));
  const currentPath = routeMatch?.pattern?.path;

  return (
    <StyledList component="nav">
      <ListItemLink
        selected={currentPath === endpoints.PRODUCTS}
        primary="Products"
        icon={<ShoppingBagIcon />}
        to={endpoints.PRODUCTS}
      />
      <ListItemLink
        selected={currentPath === endpoints.USERS}
        primary="Users"
        icon={<PeopleIcon />}
        to={endpoints.USERS}
      />
    </StyledList>
  );
};
