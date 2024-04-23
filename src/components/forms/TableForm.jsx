// Dependencies
import { useState, useEffect, useReducer, useCallback } from "react";
import styled from "styled-components";
import { useLocation } from "wouter";

// API
import api from "../../api/api.js";

// Hooks
import { useNotificationContext } from "../../hooks/useNotifications";

// Components/styling
import AddColumnBar from "./AddColumnBar.jsx";
import ColumnInput from "./ColumnInput.jsx";
import Field from "./fields/Field.jsx";
import Button from "../utils/Button.jsx";
import ApiRules from "./ApiRules.jsx";
import EditTableSettings from "./misc/EditTableSettings.jsx";
import FormFooter from "./misc/FormFooter.jsx";
import AuthOptions from "../utils/AuthOptions.jsx";

// Utils
import { validate } from "../../utils/table_form_validation.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_TYPE":
      return { ...state, type: action.payload };
    case "ADD_COLUMN":
      return { ...state, columns: [...state.columns, action.payload] };
    case "EDIT_COLUMN":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.tempId === action.payload.tempId ? action.payload : column
        ),
      };
    case "REMOVE_COLUMN":
      return {
        ...state,
        columns: state.columns.filter(
          (column) => column.tempId !== action.payload
        ),
      };
    case "EDIT_RULE":
      return { ...state, [action.payload.operation]: action.payload.rule };
    case "EDIT_OPTIONS":
      return { ...state, options: action.payload };
  }
};

export default function TableForm({
  tables,
  setTables,
  closeModal,
  currentSchema = {
    name: "",
    type: "base",
    columns: [],
    getAllRule: "admin",
    getOneRule: "admin",
    createRule: "admin",
    updateRule: "admin",
    deleteRule: "admin",
  },
}) {
  const existingId = currentSchema.id;
  const isNew = useCallback(() => {
    return existingId === undefined;
  }, [existingId]);

  const [tempIdsGenerated, setTempIdsGenerated] = useState(false);
  const [chosenInterface, setChosenInterface] = useState("columns");

  const [schema, dispatch] = useReducer(reducer, currentSchema);

  const [, setLocation] = useLocation();

  const {
    actionCreators: { showStatus, showError },
  } = useNotificationContext();

  const tableName = currentSchema.name;

  const addTempIds = (columns) => {
    columns.forEach((column) => {
      column.tempId = Math.random().toString(36).substring(7);
    });
  };

  const removeTempIds = (columns) => {
    columns.forEach((column) => {
      delete column.tempId;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clone = { ...schema };
    const errors = validate(clone, tables, existingId, isNew, currentSchema);
    if (errors.length) {
      showError(errors);
      return;
    }

    removeTempIds(clone.columns);

    try {
      if (isNew()) {
        const { table: createdTable } = await api.createTable(clone);
        setTables((prev) => [...prev, createdTable]);
      } else {
        const { table: editedTable } = await api.editTable(
          currentSchema.id,
          clone
        );
        setTables((prev) => {
          return prev.map((table) =>
            table.id === editedTable.id ? editedTable : table
          );
        });
      }
      showStatus(`Table successfully ${isNew() ? "created" : "edited"}`);
      closeModal();
      setLocation(`/_/data?table=${clone.name}`);
    } catch (err) {
      showError(`Invalid inputs: ${err.response.data.message}`);
      addTempIds(schema.columns);
    }
  };

  useEffect(() => {
    if (!isNew()) {
      addTempIds(schema.columns);
    }
    setTempIdsGenerated(true);
  }, [isNew]);

  return (
    <TableFormContainer>
      <TableFormHeaderWrapper>
        <h2 className="table-form-header">
          {`${isNew() ? "New" : `Edit ${tableName}`} Table`}
        </h2>{" "}
        {!isNew() && (
          <EditTableSettings
            tableId={currentSchema.id}
            closeModal={closeModal}
            setTables={setTables}
          />
        )}
      </TableFormHeaderWrapper>
      {tempIdsGenerated && (
        <TableFormWrapper>
          <div className="table-form-name">
            {currentSchema.type === "auth" ? (
              ""
            ) : (
              <Field
                label="Table Name"
                type="text"
                value={schema.name}
                onChange={(val) =>
                  dispatch({ type: "UPDATE_NAME", payload: val })
                }
                config={{ required: true, preventSpaces: true }}
              />
            )}
          </div>
          <TableFormNavbar>
            <div
              className={`columns-btn ${
                chosenInterface === "columns" ? "active" : "inactive"
              }`}
              onClick={() => setChosenInterface("columns")}
            >
              Columns
            </div>
            {currentSchema.type === "auth" ? (
              <div
                className={`options-btn ${
                  chosenInterface === "options" ? "active" : "inactive"
                }`}
                onClick={() => setChosenInterface("options")}
              >
                Options
              </div>
            ) : (
              <div
                className={`rules-btn ${
                  chosenInterface === "rules" ? "active" : "inactive"
                }`}
                onClick={() => setChosenInterface("rules")}
              >
                API Rules
              </div>
            )}
          </TableFormNavbar>
          <Interface>
            {chosenInterface === "columns" ? (
              <ColumnsInterface>
                <p className="system-fields">
                  <span>System fields</span>
                  <span className="system-field">id</span>
                  <span className="system-field">created_at</span>
                  <span className="system-field">updated_at</span>
                  {schema.type === "auth" ? (
                    <>
                      <span className="system-field">username</span>
                      <span className="system-field">password</span>
                    </>
                  ) : (
                    ""
                  )}
                </p>
                <AddColumnBar dispatch={dispatch} columns={schema.columns} />
                <div className="actual-columns">
                  {schema.columns.map((column) => {
                    return (
                      <ColumnInput
                        key={column.tempId}
                        schema={schema}
                        column={column}
                        dispatch={dispatch}
                        tables={tables}
                        isNew={isNew}
                      />
                    );
                  })}
                </div>
              </ColumnsInterface>
            ) : chosenInterface === "rules" ? (
              <ApiRules schema={schema} dispatch={dispatch} />
            ) : (
              <AuthOptions schema={schema} dispatch={dispatch} />
            )}
          </Interface>
        </TableFormWrapper>
      )}
      <FormFooter>
        <Button type="confirm" onClick={handleSubmit}>
          {`${isNew() ? "Add" : "Edit"} Table`}
        </Button>
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
        >
          Cancel
        </Button>
      </FormFooter>
    </TableFormContainer>
  );
}

const TableFormContainer = styled.div`
  background-color: var(--background);
`;

const TableFormHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px var(--modal-padding) 10px var(--modal-padding);
  position: relative;

  & .table-form-header {
    font-size: 1.3rem;
    font-weight: 800;
  }
`;

const TableFormWrapper = styled.form`
  display: flex;
  flex-direction: column;

  & .table-form-name {
    padding: 0 30px;
    margin-bottom: 30px;
  }
}`;

const Interface = styled.div`
  padding: 10px var(--modal-padding);
  background-color: white;
  height: calc(100vh - 250px);
  border-top: 1px solid var(--pk);
  flex-grow: 1;
  overflow-y: scroll;
`;

const ColumnsInterface = styled.div`
  & .system-fields {
    display: flex;
    align-items: center;
    gap: 3px;
    margin: 15px 0;

    & .system-field {
      padding: 2px 5px;
      background-color: var(--pk);
      border-radius: 5px;
    }
  }
`;

const TableFormNavbar = styled.div`
  display: flex;
  justify-content: space-around;

  & .columns-btn,
  .rules-btn,
  .options-btn {
    position: relative;
    margin-bottom: -0.8px;
    width: 150px;
    border-radius: 2px;
    padding: 10px 30px;
    text-align: center;
    cursor: pointer;
    color: var(--text-color);

    &.active {
      font-weight: 600;
      background-color: white;
      border-left: 1px solid var(--pk);
      border-top: 1px solid var(--pk);
      border-right: 1px solid var(--pk);
      border-bottom: 1px solid var(--white);
    }

    &.inactive {
      &:hover {
        background-color: var(--hover);
      }
    }
  }
`;
