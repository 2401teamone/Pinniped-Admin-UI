import { useEffect, useState, useCallback } from "react";

import api from "../../../api/api";

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
        console.log(value, row.id, "asldfjhasd;lfkjadsf");
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
    <div className="field-relation">
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
                <i className="fa-sharp fa-thin fa-circle-info"></i>
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
    </div>
  );
}
