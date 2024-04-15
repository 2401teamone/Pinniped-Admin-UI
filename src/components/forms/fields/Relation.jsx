import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import api from "../../../api/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Relation({
  value,
  onChange,
  handleSubmit,
  options,
  setEditing,
  handleValidation,
}) {
  const [showContext, setShowContext] = useState(undefined);
  const [rows, setRows] = useState([]);
  const [current, setCurrent] = useState(0);

  const handleSelection = useCallback(
    (row) => {
      let selection = value === row.id ? null : row.id;
      if (handleValidation && handleValidation(selection)) {
        onChange(selection);
        if (handleSubmit) handleSubmit(selection);
      }
      setEditing(false);
    },
    [handleSubmit, onChange, setEditing, value, handleValidation]
  );

  useEffect(() => {
    api.getAll(options.tableId).then((data) => {
      setRows(data.rows);
    });
  }, [options.tableId]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown") {
        setCurrent((prev) => (prev + 1) % rows.length);
      }
      if (e.key === "ArrowUp") {
        setCurrent((prev) => (prev - 1 + rows.length) % rows.length);
      }
      if (e.key === " ") {
        handleSelection(rows[current]);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [current, handleSelection, rows, setEditing]);

  return (
    <Container className="field-relation">
      {rows.length &&
        rows.map((row, idx) => {
          return (
            <div
              key={row.id}
              className={`field-relation-option ${
                value === row.id ? "active" : ""
              } ${current === idx ? "highlight" : ""}`}
              onClick={() => handleSelection(row)}
            >
              <span
                className="row-context"
                onMouseOver={() => setShowContext(row.id)}
                onMouseOut={() => setShowContext(undefined)}
              >
                <FontAwesomeIcon icon="fa-sharp fa-thin fa-circle-info" />

                {showContext === row.id && (
                  <div className="row-context-dropdown">
                    <pre>{JSON.stringify(row, null, 2)}</pre>
                  </div>
                )}
              </span>
              <span className="row-id">{row.id}</span>
            </div>
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
    width: inherit;
    min-width: max-content;
    top: 15px;
    box-shadow: var(--shadow-1);
    border: 1px solid var(--light-gray);
    z-index: 10000;
    background-color: white;
    padding: 5px;
    border-radius: var(--min-radius);

    &.active {
      color: var(--blue);
      font-weight: 600;
    }

    & .field-relation-option {
      display: flex;
      gap: 10px;
      cursor: pointer;
      padding: 5px 40px 5px 3px;
      border-radius: var(--min-radius);
      position: relative;
      border-bottom: 1px solid var(--pk);

      &:last-child {
        border-bottom: none;
      }

      &.active {
        color: var(--blue);
      }

      &:hover {
        background-color: var(--hover);
      }

      &.highlight {
        background-color: var(--hover);
      }

      & .row-context {
        & .row-context-dropdown {
          width: max-content;
          height: max-content;
          position: absolute;
          left: 20px;
          top: 20px;
          z-index: 100000000000000;
          background-color: var(--blue);
          color: white;
          font-weight: 600;

          box-shadow: var(--shadow-3);
          border: 1px solid var(--light-gray);
          padding: 10px;

          & pre {
            line-height: 1.5;
          }
        }
      }
    }
  }
`;
