import { useState, useEffect, useRef } from "react";

import Icon from "../utils/Icon";
import ActionIcon from "../utils/ActionIcon";
import ColumnOptions from "./ColumnOptions";

export default function ColumnInput({ schema, column, dispatch, tables }) {
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  const updateColumn = (field, value) => {
    dispatch({
      type: "EDIT_COLUMN",
      payload: { ...column, [field]: value },
    });
  };

  return (
    <div className={`column-container ${showOptions && "show-border"}`}>
      <div className="column-input-container">
        <div className="column-input">
          <Icon column={column} />
          <input
            type="text"
            ref={inputRef}
            value={column.name}
            onChange={(e) => updateColumn("name", e.target.value)}
            disabled={column.type === "creator"}
          />
        </div>
        <ActionIcon onClick={() => setShowOptions((prev) => !prev)}>
          <i className="fa-sharp fa-regular fa-gear"></i>
        </ActionIcon>
      </div>
      {showOptions && (
        <div>
          <ColumnOptions
            schema={schema}
            column={column}
            dispatch={dispatch}
            tables={tables}
          />
        </div>
      )}
    </div>
  );
}
