import { ReactNode } from "react";
import { AuthProvider } from "./contexts/auth";

interface IProps {
  children: ReactNode;
}

const AppProviders = (props: IProps) => {
  return <AuthProvider>{props.children}</AuthProvider>;
};

export default AppProviders;
