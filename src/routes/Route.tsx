import { Redirect, Route as ReactRoute, RouteProps } from "react-router-dom";
import { ComponentType } from "react";
import { useAuth } from "../contexts/Auth";

interface IProps extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

export const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: IProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={() =>
        isPrivate === !!isAuthenticated ? (
          <Component />
        ) : (
          <Redirect to={isPrivate ? "/" : "/dashboard"} />
        )
      }
    />
  );
};
