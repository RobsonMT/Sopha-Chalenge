import { screen, render } from "@testing-library/react";
import { ModalCreateTask } from "../../../components/Modal/ModalCreateTask";

test("Should renders ModalCreateTask component", () => {
  render(<ModalCreateTask isOpen={true} onClose={jest.fn()} />);

  const textAreaElement = screen.findByText("Adicionar Tarefa");
  expect(textAreaElement).toBeTruthy();
  expect(textAreaElement).not.toBeNull();
});
