import styled from "styled-components";

export default function SubNavbar({ children }) {
  return <SubNavbarWrapper>{children}</SubNavbarWrapper>;
}

const SubNavbarWrapper = styled.div`
grid-area: subnavbar;
height: 100vh;
width: var(--subnavbar-width);
background-color: white;
border-right: 1px solid var(--light-gray); */
`;
