import styled from "styled-components";

export default function Footer({ overlapping, children }) {
  return (
    <Container className={`footer ${overlapping && "overlapping"}`}>
      <div className="content">{children}</div>
      <div className="standard">Pinniped v0.0.1</div>
    </Container>
  );
}

const Container = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  bottom: 0;
  align-items: center;
  padding: 20px;
  width: calc(100% - var(--subnavbar-width) - var(--navbar-width));
  cursor: default;
  max-height: 50px;
  position: absolute;
  background-color: var(--background);
  z-index: 60;

  &.overlapping {
    border-top: 1px solid var(--pk);
  }

  & .content {
    font-weight: 600;
    font-size: 1rem;
    color: var(--text-color);
  }

  & .standard {
    font-style: italic;
    color: var(--light-gray);
  }
`;
