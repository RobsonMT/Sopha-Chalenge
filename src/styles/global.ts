import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    outline: 0;
  } 

  :root{
    --black: rgb(0, 0, 0);
    --white: rgb(255, 255, 255);
    --blue: rgb(52, 133, 255);
    --red: rgb(231, 76, 60);
    --green: rgb(22, 160, 133);
    --grey: rgb(135, 134, 139);
  }

  html{
    scroll-behavior: smooth;
    font-size: 62.5%;
  }

  body, button, input, span,a{
    font-size: clamp(14px, 1.6rem, 2vw);
    font-family: 'Open Sans', sans-serif;
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
`;
