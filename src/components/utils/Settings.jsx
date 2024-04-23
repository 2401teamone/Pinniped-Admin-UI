import { useState } from "react";
import styled from "styled-components";

import Panel from "./Panel";

import { MoreHorizontal } from "react-feather";

export default function Settings({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container className="settings-container">
      <div className="settings-btn" onClick={() => setIsOpen(!isOpen)}>
        <MoreHorizontal size={12}></MoreHorizontal>
      </div>
      {isOpen && (
        <Panel setIsOpen={setIsOpen} position="right">
          <div className="settings">{children}</div>
        </Panel>
      )}
    </Container>
  );
}

const Container = styled.div`
  /* position: absolute; */
  right: 2px;
  bottom: 0px;
  height: 20px;
  display: flex;
  align-items: center;
  position: relative;

  & .settings-btn {
    cursor: pointer;
    padding: 5px;
    border-radius: var(--min-radius);
    &:hover {
      background-color: var(--hover);
    }
  }
  & .settings {
    position: absolute;
    background-color: white;
    width: 70px;
    padding: 2px;
    border-radius: var(--min-radius);
    font-weight: 600;
    box-shadow: var(--shadow-3);

    & .settings-item {
      color: var(--red);
      padding: 5px;
      cursor: pointer;
      font-size: 1.2rem;
      display: flex;
      gap: 10px;

      &:hover {
        background-color: var(--hover);
      }
    }
  }
`;
