import { MouseEventHandler, useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Collapse, List } from "@mui/material";

import { useRouteMatch } from "@/hooks";
import * as endpoints from "@/router/endpointConstants";

import { ListItemLink } from "../../lib/mui/components/Link";

import { StyledList } from "./styled";

export const Navigation = () => {
  const routeMatch = useRouteMatch(Object.values(endpoints));

  const currentPath = routeMatch?.pattern?.path;

  const [productsItemOpen, setProductsItemOpen] = useState<boolean>(
    currentPath === endpoints.CATEGORIES
  );

  const toggleProductsChildrenHandler: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setProductsItemOpen((prevState) => !prevState);
  };

  return (
    <StyledList component="nav">
      <ListItemLink
        selected={currentPath === endpoints.USERS}
        primary="Users"
        icon={<PeopleIcon />}
        to={endpoints.USERS}
      />
      <ListItemLink
        hasChildren
        selected={currentPath === endpoints.PRODUCTS}
        primary="Products"
        icon={<ShoppingBagIcon />}
        to={endpoints.PRODUCTS}
        itemActionProps={{
          onClick: toggleProductsChildrenHandler,
        }}
      />
      <Collapse in={productsItemOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            sx={{ pl: 4 }}
            selected={currentPath === endpoints.CATEGORIES}
            primary="Categories"
            icon={<CategoryIcon />}
            to={endpoints.CATEGORIES}
          />
        </List>
      </Collapse>
    </StyledList>
  );
};
