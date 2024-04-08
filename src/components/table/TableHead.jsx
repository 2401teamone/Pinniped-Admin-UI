import Icon from "../utils/Icon";

import styled from "styled-components";

export default function TH({ column }) {
  return (
    <Th className={`${column.type === "pk" ? "pk-col" : ""}`}>
      <span>
        <Icon column={column} />
      </span>
      <span>{column.name}</span>
    </Th>
  );
}

const Th = styled.th`
  text-align: left;
  color: var(--text-color);
  cursor: pointer;
  font-weight: 600;
  vertical-align: middle;
  min-width: max-content;
  white-space: nowrap;
  padding-right: 30px;

  & span {
    margin-right: 10px;
  }
`;
