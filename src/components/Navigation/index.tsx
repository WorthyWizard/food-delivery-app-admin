import { MouseEventHandler, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Collapse, List } from "@mui/material";

import { useRouteMatch } from "@/hooks";
import { mainEndpointsMap } from "@/router";

import { ListItemLink } from "../../lib/mui/components/Link";

import { StyledList } from "./styled";

export const Navigation = () => {
  const routeMatch = useRouteMatch(Object.values(mainEndpointsMap));

  const currentPath = routeMatch?.pattern?.path;

  const [productsItemOpen, setProductsItemOpen] = useState<boolean>(
    currentPath === mainEndpointsMap.CATEGORIES,
  );

  const toggleProductsChildrenHandler: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    setProductsItemOpen((prevState) => !prevState);
  };

  return (
    <StyledList component="nav">
      <ListItemLink
        selected={currentPath === mainEndpointsMap.USERS}
        primary="Users"
        icon={<PeopleIcon />}
        to={mainEndpointsMap.USERS}
      />
      <ListItemLink
        hasChildren
        open={productsItemOpen}
        selected={currentPath === mainEndpointsMap.PRODUCTS}
        primary="Products"
        icon={<ShoppingBagIcon />}
        to={mainEndpointsMap.PRODUCTS}
        itemActionProps={{
          onClick: toggleProductsChildrenHandler,
        }}
      />
      <Collapse in={productsItemOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            sx={{ pl: 4 }}
            selected={currentPath === mainEndpointsMap.CATEGORIES}
            primary="Categories"
            icon={<CategoryIcon />}
            to={mainEndpointsMap.CATEGORIES}
          />
        </List>
      </Collapse>
      <ListItemLink
        selected={currentPath === mainEndpointsMap.ORDERS}
        primary="Orders"
        icon={<ListAltRoundedIcon />}
        to={mainEndpointsMap.ORDERS}
      />
    </StyledList>
  );
};
