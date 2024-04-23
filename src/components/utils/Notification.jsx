import { useEffect } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

import { AlertCircle, CheckCircle } from "react-feather";

import { useNotificationContext } from "../../hooks/useNotifications.jsx";

export default function Notification({ type, children }) {
  const {
    actionCreators: { closeNotification },
  } = useNotificationContext();

  useEffect(() => {
    if (type === "error" || type === "status") {
      const timeoutId = setTimeout(() => {
        closeNotification();
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [type, closeNotification]);

  const notification = (
    <Container className={`notification ${type}`}>
      <div className="left">
        <div className="icon">
          {type === "error" ? (
            <AlertCircle size={15} />
          ) : (
            <CheckCircle size={15} />
          )}
        </div>
        <div className="message">{children}</div>
      </div>
      <div className="clear" onClick={closeNotification}>
        X
      </div>
    </Container>
  );

  return createPortal(notification, document.querySelector("#notifications"));
}

const Container = styled.div`
  position: absolute;
  bottom: 30px;
  left: 40%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  min-width: 300px;
  min-height: 50px;

  z-index: 100;

  background-color: white;

  padding: 10px;

  letter-spacing: 0.5px;

  box-shadow: var(--shadow-3);
  border: 1px solid var(--light-gray);
  border-radius: var(--min-radius);

  & .left {
    display: flex;
    align-items: center;
    gap: 10px;
    & .icon {
      font-size: 1.5rem;
    }

    & .message {
      padding-left: 10px;
      border-left: 1px solid var(--light-gray);
      font-size: 1.1rem;
      flex-grow: 1;
      max-width: 300px;
      flex-wrap: wrap;
    }
  }

  & .clear {
    /* position: absolute; */
    /* right: 15px; */
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;

    &:hover {
      background-color: var(--hover);
    }
  }

  &.status {
    background-color: var(--status-background);
    border: 1px solid var(--blue);
    color: black;

    & .icon,
    .clear {
      color: var(--status-font);
    }
  }

  &.error {
    background-color: var(--error-background);
    border: 1px solid var(--red);
    color: black;

    & .icon,
    .clear {
      color: var(--error-font);
    }
  }
`;
