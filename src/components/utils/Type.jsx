import Icon from "./Icon";
import styled from "styled-components";

export default function Type({ type, error, children }) {
  return (
    <Container className={`type ${error && "error"}`}>
      <Icon column={{ type: type }} />
      <span className="type-name">{children}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);

  &.error {
    color: var(--error-font);
  }

  & i {
    font-weight: 800;
  }

  & .type-name {
    font-weight: 600;
  }
`;
