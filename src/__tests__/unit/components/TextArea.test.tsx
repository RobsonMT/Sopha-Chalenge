import { screen, render } from "@testing-library/react";
import { TextArea } from "../../../components/Form/TextArea";

test("Should renders TextArea component", () => {
  render(
    <TextArea
      name="description"
      placeholder="Degite a descrição"
      label="Descrição"
    />
  );

  const textAreaElement = screen.findByPlaceholderText("Digite a descrição");
  expect(textAreaElement).toBeTruthy();
  expect(textAreaElement).not.toBeNull();
});
