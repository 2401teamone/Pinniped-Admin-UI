// Dependencies
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// Components/styling
import Icon from "../utils/Icon";
import ActionIcon from "../utils/ActionIcon";
import ColumnOptions from "./ColumnOptions";

import { Menu } from "react-feather";

export default function ColumnInput({
  schema,
  column,
  dispatch,
  tables,
  isNew,
}) {
  const [showOptions, setShowOptions] = useState(false);

  const inputRef = useRef(null);

  const updateColumn = (field, value) => {
    dispatch({
      type: "EDIT_COLUMN",
      payload: { ...column, [field]: value },
    });
  };

  useEffect(() => {
    if (isNew()) inputRef.current.focus();
  }, [isNew]);

  return (
    <ColumnInputContainer className={showOptions && "show-border"}>
      <ColumnInputWrapper>
        <ColumnInputField>
          <Icon column={column} />
          <input
            type="text"
            ref={inputRef}
            value={column.name}
            onChange={(e) => updateColumn("name", e.target.value)}
            disabled={column.type === "creator"}
          />
        </ColumnInputField>
        <ActionIcon onClick={() => setShowOptions((prev) => !prev)}>
          <Menu size={12} />
        </ActionIcon>
      </ColumnInputWrapper>
      <ShowColumnOptions className={showOptions ? "expanded" : "hide"}>
        <ColumnOptions
          schema={schema}
          column={column}
          dispatch={dispatch}
          tables={tables}
        />
      </ShowColumnOptions>
    </ColumnInputContainer>
  );
}

const ColumnInputContainer = styled.div`
  margin: 20px 0;
  border-radius: var(--min-radius);
  transition: box-shadow 0.3s ease;

  &.show-border {
    border: 1px solid var(--pk);
    box-shadow: var(--shadow-3);
  }
`;

const ColumnInputWrapper = styled.div`
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: var(--secondary-background);
  padding: 4px 8px;
`;

const ColumnInputField = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 5px;

  & input {
    background-color: inherit;
    width: 100%;
    font-size: 1.1rem;
    color: var(--text-color);
  }
`;

const ShowColumnOptions = styled.div`
  border: 1px solid var(--pk);
  display: none;
  overflow: hidden;

  max-height: 0px;

  &.expanded {
    display: block;
    animation: toggleOptionsOpen 0.6s ease;
    animation-fill-mode: both;
  }

  &.hide {
    animation: toggleOptionsClose 0.8s ease;
    animation-fill-mode: both;
  }

  @keyframes toggleOptionsOpen {
    from {
      opacity: 0.5;
      max-height: 0px;
    }
    to {
      opacity: 1;
      max-height: 300px;
    }
  }

  @keyframes toggleOptionsClose {
    from {
      opacity: 1;
      max-height: 300px;
    }
    to {
      opacity: 0;
      max-height: 0px;
    }
  }
`;
