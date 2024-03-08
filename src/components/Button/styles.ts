import styled from "styled-components";

export const Container = styled.div`
  button {
    background-color: var(--blue);
    color: var(--white);
    border: none;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    height: 4rem;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;

    &:hover {
      background-color: var(--blue);
      filter: brightness(1.2);
    }
  }

  button > span {
    font-size: 1.6rem;
  }
`;
