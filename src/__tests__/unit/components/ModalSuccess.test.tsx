import { screen, render } from "@testing-library/react";
import { ModalSuccess } from "../../../components/Modal/ModalSuccess";

test("Should renders ModalEditTask component", () => {
  render(
    <ModalSuccess
      isOpen={true}
      onClose={jest.fn()}
      onClick={jest.fn}
      buttonMessage="Ir para login"
      message="Usuário cadastrado com sucesso"
      secondaryText="Texto secundario"
    />
  );

  const modalElement = screen.getByText("Ir para login");
  expect(modalElement).toBeTruthy();
  expect(modalElement).not.toBeNull();
});
