import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@material-ui/core";
import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { Container } from "./styles";

interface ButtonProps extends MuiButtonProps {
  children: ReactNode;
}

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, ...rest },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref
) => (
  <Container>
    <MuiButton {...rest} variant="outlined" fullWidth>
      {children}
    </MuiButton>
  </Container>
);

export const Button = forwardRef(ButtonBase);
