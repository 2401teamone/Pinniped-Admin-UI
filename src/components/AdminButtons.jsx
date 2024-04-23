import SubNavbar from "./utils/SubNavbar";
import styled from "styled-components";

import { Archive } from "react-feather";

export default function AdminButtons({
  currentInterface,
  setCurrentInterface,
}) {
  const buttons = ["Backup"];

  let icon = {
    Backup: <Archive size={15} />,
  };
  return (
    <SubNavbar>
      <Container className="admin-buttons">
        {buttons.map((button) => {
          return (
            <Button
              key={button}
              className={`admin-button ${
                currentInterface === button ? "active" : ""
              }`}
              onClick={() => setCurrentInterface(button)}
            >
              <span>{icon[button]}</span>
              <span>{button}</span>
            </Button>
          );
        })}
      </Container>
    </SubNavbar>
  );
}

const Container = styled.div`
  padding: 0 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
`;

const Button = styled.div`
  padding: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 8px 0;

  &.active {
    background-color: var(--hover);
  }

  &:hover {
    background-color: var(--hover);
  }
`;
