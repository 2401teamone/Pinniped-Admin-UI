import { useRef } from "react";
import styled from "styled-components";

export default function Button({ type, children, ...props }) {
  const buttonRef = useRef();

  return (
    <ButtonWrapper className={`btn ${type}`} {...props} ref={buttonRef}>
      {children}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 7px 25px;
  border-radius: var(--min-radius);
  transition: scale 300ms ease;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  flex-wrap: no-wrap;
  justify-content: center;
  height: 30px;

  & svg {
    margin-right: 5px;
  }

  &:focus {
    outline: 2px dashed var(--green);
    outline-offset: 3px;
  }
  &:active {
    transform: scale(0.95);
    outline: none;
  }

  &.primary {
    background-color: white;
    color: black;
    border: 2px solid black;

    &:hover {
      background-color: var(--hover);
    }
  }

  &.secondary {
    background-color: black;
    color: white;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  &.inherit {
    background-color: inherit;

    &:hover {
      background-color: var(--hover);
    }
  }

  &.danger {
    background-color: var(--red);
    color: white;
    border: 1px solid var(--red);
    &:hover {
      background-color: var(--red-light);
    }
  }

  &.confirm {
    background-color: var(--accent3);
    color: white;
    border: 1px solid black;

    &:hover {
      background-color: var(--green-light);
    }
  }

  &.utility {
    background-color: var(--sage);
    color: white;

    &:hover {
      background-color: var(--sage-light);
    }
  }

  &.borderless {
    background-color: transparent;
    border: none;
    color: black;

    &:hover {
      background-color: var(--hover);
    }
  }
`;
