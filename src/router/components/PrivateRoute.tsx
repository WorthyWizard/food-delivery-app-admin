import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactNode;
  allowedRoles: string[];
}

export const PrivateRoute = (props: Props) => {
  const { allowedRoles } = props;

  const roles: any[] = [];

  return roles.find((role) => allowedRoles.includes(role.role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
