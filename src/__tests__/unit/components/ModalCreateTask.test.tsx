import { screen, render } from "@testing-library/react";
import { ModalCreateTask } from "../../../components/Modal/ModalCreateTask";

test("Should renders ModalCreateTask component", () => {
  render(<ModalCreateTask isOpen={true} onClose={jest.fn()} />);

  const modalElement = screen.getByText("Adicionar Tarefa");
  expect(modalElement).toBeTruthy();
  expect(modalElement).not.toBeNull();
});
