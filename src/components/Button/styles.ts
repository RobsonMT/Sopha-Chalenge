import styled from "styled-components";

export const Container = styled.div`
  button {
    background-color: var(--blue);
    color: var(--white);
    font-weight: 700;
    font-size: 1.6rem;
    height: 5rem;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    &:hover {
      background-color: var(--blue);
      filter: brightness(1.2);
    }
  }

  button > span {
    font-size: 1.4rem;
  }
`;
