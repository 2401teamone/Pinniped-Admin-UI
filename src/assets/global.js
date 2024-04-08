import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
  v2.0 | 20110126
  License: none (public domain)
  */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
  display: block;
  }
  body {
  line-height: 1;
  }
  ol,
  ul {
  list-style: none;
  }
  blockquote,
  q {
  quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
  content: '';
  content: none;
  }
  table {
  border-collapse: collapse;
  border-spacing: 0;
  }

  
  :root {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 10px;
    --black: #000;
    --light-gray: rgba(0, 0, 0, 0.3);
    --hover: rgba(0, 0, 0, 0.1);
    --background: #f7f9f9;
    --secondary-background: rgb(228, 233, 236);
    --pk: rgb(215, 221, 228);
    
    --side-modal-background: rgba(53, 71, 104, 0.28);
    --editing-background: rgba(53, 71, 104, 0.2);
    
    --text-color: rgb(102, 111, 117);
    
    --blue: #2274a5;
    --blue-light: rgba(34, 116, 165, 0.5);
    --red: #d77a61;
    --red-light: rgba(215, 122, 97, 0.5);
    --green: #7eb09b;
    --green-light: rgba(126, 176, 155, 0.5);
    --sage: #c5c9a4;
    --sage-light: rgba(197, 201, 164, 0.5);
    --brown: #423629;
    --brown-light: rgba(66, 54, 41, 0.5);
    
    --foreground: #85859c;
    --accent1: #56e4b7;
    --accent2: #66c4ae;
    --accent3: #75a5a5;
    
    --error-background: #ffcdd2;
    --error-font: #e53935;
    
    --status-background: #cbead1;
    --status-font: #4fc467;
    
    --highlight: hsl(62, 100%, 85%);
    
    --radius: 10px;
    --min-radius: 4px;
    
    --navbar-width: 70px;
    --subnavbar-width: 200px;
    --side-modal-width: 550px;
    
    --content-padding: 40px;
    --modal-padding: 30px;
    
    --shadow-1: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    --shadow-2: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    --shadow-3: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    --shadow-4: rgba(0, 0, 0, 0.06) 0px 2px 5px 0px;
  }

  html, body {
    height: 100%;
    width: 100%;
    max-width: 100%;
    overlow: hidden;
  }

  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: var(--font-secondary);
    background-color: var(--background);
  }

  button {
    cursor: pointer;
    border: none;
  }
  input {
    border: none;
    outline: none;
    padding-block: 0px;
    padding-inline: 0px;
  }
  `;

export default GlobalStyles;
