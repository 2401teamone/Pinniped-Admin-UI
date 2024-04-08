import styled from "styled-components";

import { Folder, User } from "react-feather";

export default function NavRow({ active, table, onClick, children }) {
  return (
    <NavRowWrapper className={active && "active-nav-row"} onClick={onClick}>
      <span>
        {table.name === "users" || table.name === "_admins" ? (
          <User size={15} />
        ) : (
          <Folder size={15} />
        )}
      </span>
      <span>{children}</span>
    </NavRowWrapper>
  );
}

export const NavRowWrapper = styled.div`
  margin: 8px 15px;
  padding: 15px 20px;
  border-radius: var(--min-radius);
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  color: var(--text-color);
  font-size: 1.1rem;

  &.active-nav-row {
    background-color: var(--secondary-background);
  }
  &:hover {
    background-color: var(--secondary-background);
  }

  &:active {
    background-color: var(--light-gray);
  }
`;
