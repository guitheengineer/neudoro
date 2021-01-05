import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Quicksand;
  }
  #root,
  html,
  body {
    height: 100vh;
    min-height: 570px;
    background: linear-gradient(119.36deg, #464c6e 0%, #272b45 100%);
  }

  li {
    list-style-type: none;
  }
  
  button {
    cursor: pointer;
    border: 0;
    background: transparent;
  }
`;

export default GlobalStyle;
