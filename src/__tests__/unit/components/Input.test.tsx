import { screen, render } from "@testing-library/react";
import { Input } from "../../../components/Form/Input";

test("Should renders Input component", () => {
  render(
    <Input
      name="password"
      type="password"
      placeholder="Digite sua senha"
      label="Senha"
    />
  );

  const inputElement = screen.findByPlaceholderText("Digite sua senha");
  expect(inputElement).toBeTruthy();
  expect(inputElement).not.toBeNull();
});
