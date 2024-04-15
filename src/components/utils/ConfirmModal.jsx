import { createPortal } from "react-dom";
import styled from "styled-components";

import Button from "./Button";

export default function ConfirmModal({
  onClose,
  children,
  onConfirm,
  no = "no",
  yes = "yes",
}) {
  const modal = (
    <Container className="modal-container">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal">
        <div className="message">{children}</div>
        {onConfirm && typeof onConfirm === "function" ? (
          <div className="btns">
            <Button type="inherit" onClick={onClose}>
              {no}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {yes}
            </Button>
          </div>
        ) : (
          <div className="btns-small">
            <Button type="inherit" onClick={onClose}>
              X
            </Button>
          </div>
        )}
      </div>
    </Container>
  );

  return createPortal(modal, document.querySelector("#modal"));
}

const Container = styled.div`
  & .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--side-modal-background);

    z-index: 110;
  }

  & .modal {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;

    box-shadow: var(--shadow-1);
    background-color: white;
    z-index: 120;

    & .message {
      letter-spacing: 0.5px;
      padding: 15px;
      padding-bottom: none;
    }

    .btns {
      border-top: 1px solid var(--pk);
      display: flex;
      gap: 20px;
      justify-content: flex-end;
      padding-top: 10px;
      background-color: var(--background);
      padding: 15px 10px;
    }

    .btns-small {
      position: absolute;
      top: 3px;
      right: 3px;
    }
  }
`;
