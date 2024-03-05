import { Link as RouterLink, useLocation } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NavigateNextIcon from "@mui/icons-material/NavigateNextRounded";
import {
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps,
  Chip,
  Link,
  Typography,
} from "@mui/material";

import { AllEndpoints, allEndpointsNameMap } from "@/router";

interface Props extends BreadcrumbsProps {}

export const Breadcrumbs = (props: Props) => {
  const { sx, ...rest } = props;

  const { pathname } = useLocation();

  const pathnames = pathname
    .split("/")
    .filter((path) => path) as AllEndpoints[];

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ "& .MuiBreadcrumbs-ol": { height: 24 }, ...sx }}
      {...rest}
    >
      <Link
        to="/"
        component={RouterLink}
        underline="hover"
        display="flex"
        alignItems="center"
        color="text.secondary"
      >
        <HomeRoundedIcon color="inherit" fontSize="small" />
      </Link>
      {pathnames.map((path, index, pathnames) => {
        let label: JSX.Element | string = "";
        let pathRender: JSX.Element | null = null;

        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        if (allEndpointsNameMap[path]) {
          label = allEndpointsNameMap[path];
        } else if (
          !isNaN(Number(path)) ||
          pathnames[index - 1] === "products"
        ) {
          switch (pathnames[index - 1]) {
            case "products":
              label = `ID: ${path}`;
              break;
          }
        } else {
          label = path;
        }

        if (last) {
          pathRender = (
            <Typography
              variant="body2"
              fontWeight={500}
              lineHeight={0}
              color="text.primary"
              key={to}
            >
              {label}
            </Typography>
          );
        } else if (
          !isNaN(Number(path)) ||
          pathnames[index - 1] === "products" ||
          pathnames[index - 1] === "product-categories"
        ) {
          pathRender = <Chip key={to} size="small" label={label} />;
        } else {
          pathRender = (
            <Link
              variant="body2"
              to={to}
              key={to}
              component={RouterLink}
              underline="hover"
              color="text.secondary"
            >
              {label}
            </Link>
          );
        }

        return pathRender;
      })}
    </MuiBreadcrumbs>
  );
};
