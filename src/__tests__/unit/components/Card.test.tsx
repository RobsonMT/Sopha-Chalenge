import { screen, render } from "@testing-library/react";
import { Card } from "../../../components/Card";

test("Should renders Card component", () => {
  const mockData = {
    id: 1,
    title: "Tafera 1",
    description: "Descrição da tarefa",
    completed: false,
    dueDate: "12-03-2024",
    priority: "baixa",
    userId: 1,
  };

  render(<Card task={mockData} />);

  const cardElement = screen.findByText("Tarefa 1");
  expect(cardElement).toBeTruthy();
  expect(cardElement).not.toBeNull();
});
