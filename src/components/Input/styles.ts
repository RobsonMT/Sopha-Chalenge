import styled from "styled-components";

interface IProps {
  variation: string;
}

export const Container = styled.div`
  text-align: left;
`;

export const ErrorMessage = styled.label`
  > span {
    color: var(--red);
  }
`;

export const InputLabel = styled.label`
  color: gray;
`;

export const InputContainer = styled.div<IProps>`
  border: 0.1rem solid transparent;

  border-color: ${({ variation }) => variation === "default" && "var(--grey)"};
  border-color: ${({ variation }) => variation === "focus" && "var(--blue)"};
  border-color: ${({ variation }) => variation === "filled" && "var(--green)"};
  border-color: ${({ variation }) => variation === "error" && "var(--red)"};

  border-radius: 0.5rem;
  padding: 1rem;
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  transition: 0.5s;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 1rem;
  }

  input {
    color: ${({ variation }) => variation === "default" && "var(--grey)"};
    color: ${({ variation }) => variation === "focus" && "var(--blue)"};
    color: ${({ variation }) => variation === "filled" && "var(--green)"};
    color: ${({ variation }) => variation === "error" && "var(--red)"};

    border: none;
    background-color: transparent;
    height: 3rem;
    width: inherit;
    align-items: center;

    &::placeholder {
      color: var(--gray);
    }
  }
`;
