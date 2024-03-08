import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid blue;

  width: 100%;
  height: calc(100vh - 4rem);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  border: 1px solid var(--grey);

  min-width: 32rem;
  max-width: 38rem;
  width: 100%;

  padding: 2rem;
  border-radius: 0.5rem;

  .button {
    width: 100%;
  }
`;
