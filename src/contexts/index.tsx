import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { AuthProvider } from "./Auth";
import { TaskProvider } from "./Tasks";

interface IAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProviderProps) => (
  <AuthProvider>
    <TaskProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </TaskProvider>
  </AuthProvider>
);
