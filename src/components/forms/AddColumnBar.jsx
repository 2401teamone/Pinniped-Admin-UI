// Dependencies
import { useState } from "react";
import styled from "styled-components";

// Hooks
import { useConfirmModalContext } from "../../hooks/useConfirmModal";

// Constants
import { TYPES } from "../../constants/constants";

// Components/styling
import Icon from "../utils/Icon.jsx";

const determineOptions = (type) => {
  switch (type) {
    case "text":
      return { minLength: 0, maxLength: 255 };
    case "number":
      return { min: 0, max: 1000 };
    case "date":
      return { min: "2021-01-01", max: "2022-01-01" };
    case "bool":
    case "email":
    case "url":
    case "creator":
      return {};
    case "json":
      return { maxSize: 20000 };
    case "relation":
      return { tableId: "", cascadeDelete: 0 };
    case "select":
      return { maxSelect: 1, options: [] };
    default:
      throw new Error("invalid type");
  }
};

const creatorColumnAlreadyExists = (columns) => {
  for (let column of columns) {
    if (column.type === "creator") {
      return true;
    }
  }
  return false;
};

export default function AddColumnBar({ dispatch, columns }) {
  const [showContext, setShowContext] = useState("");

  const {
    actionCreators: { open },
  } = useConfirmModalContext();

  const addColumn = (type) => {
    if (type === "creator" && creatorColumnAlreadyExists(columns)) {
      open("Creator column already exists");
      return;
    }
    const generateID = () => {
      return Math.random().toString(36).substring(7);
    };

    const newField = {
      tempId: generateID(),
      name: type === "creator" ? "creator" : "",
      system: type === "creator" ? true : false,
      type,
      required: 0,
      options: determineOptions(type),
    };

    dispatch({ type: "ADD_COLUMN", payload: newField });
  };

  const addColumnBar = Object.values(TYPES).map((type) => {
    return (
      <span
        key={type}
        className="add-column-btn"
        onClick={() => addColumn(type)}
        onMouseOver={() => setShowContext(type)}
        onMouseLeave={() => setShowContext("")}
      >
        <Icon column={{ type }} />
        {showContext === type && <span className="context">{type}</span>}
      </span>
    );
  });

  return <AddColumnBarWrapper>{addColumnBar}</AddColumnBarWrapper>;
}

const AddColumnBarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 5px 0;
  padding-bottom: 10px;
  padding-top: 10px;
  border-top: 2px dashed var(--pk);
  border-bottom: 2px dashed var(--pk);

  & .add-column-btn {
    position: relative;
    font-size: 1.2rem;
    border-radius: 5px;
    border: 1px solid var(--light-gray);
    color: var(--text-color);
    padding: 5px 10px;
    cursor: pointer;
    box-shadow: var(--shadow-3);
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--accent2);
    }

    &:active {
      transform: scale(0.9);
    }

    & .context {
      position: absolute;
      top: 115%;
      left: 0;
      background-color: white;
      padding: 4px 10px;
      border: 1px solid var(--light-gray);
      border-radius: 5px;
    }
  }
`;
