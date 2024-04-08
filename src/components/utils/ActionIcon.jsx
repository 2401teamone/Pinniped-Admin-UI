import styled from "styled-components";

export default function ActionIcon({ children, ...props }) {
  return <ActionIconWrapper {...props}>{children}</ActionIconWrapper>;
}

const ActionIconWrapper = styled.div`
  border-radius: 50%;
  padding: 7px;
  /* padding: 10px; */
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.4rem;
  transition: all 0.2s ease;
  /* margin: 0 10px; */

  &:hover {
    background-color: var(--hover);
  }

  &:active {
    transform: scale(0.95);
  }
`;
