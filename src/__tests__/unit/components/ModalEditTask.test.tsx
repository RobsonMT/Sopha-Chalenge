import { screen, render } from "@testing-library/react";
import { ModalEditTask } from "../../../components/Modal/ModalEditTask";

test("Should renders ModalEditTask component", () => {
  const mockData = {
    id: 1,
    title: "Tafera 1",
    description: "Descrição da tarefa",
    completed: false,
    dueDate: "12-03-2024",
    priority: "baixa",
    userId: 1,
  };

  render(<ModalEditTask task={mockData} isOpen={true} onClose={jest.fn()} />);

  const textAreaElement = screen.findByText("Editar Tarefa");
  expect(textAreaElement).toBeTruthy();
  expect(textAreaElement).not.toBeNull();
});
