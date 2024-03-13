import { useState, useEffect, useReducer, useCallback } from 'react';

import AddColumnBar from './AddColumnBar.jsx';
import ColumnInput from './ColumnInput.jsx';
import FieldInput from './fields/FieldInput.jsx';
import Button from '../utils/Button.jsx';
import ApiRules from './ApiRules.jsx';

import { createTable, editTable } from '../../api/schema.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, name: action.payload };
    case 'ADD_COLUMN':
      return { ...state, columns: [...state.columns, action.payload] };
    case 'EDIT_COLUMN':
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.tempId === action.payload.tempId ? action.payload : column
        ),
      };
    case 'REMOVE_COLUMN':
      return {
        ...state,
        columns: state.columns.filter(
          (column) => column.tempId !== action.payload
        ),
      };
    case 'EDIT_RULE':
      return { ...state, [action.payload.operation]: action.payload.rule };
  }
};

export default function TableForm({
  setTables,
  closeModal,
  currentSchema = {
    name: '',
    columns: [],
    getAllRule: 'admin',
    getOneRule: 'admin',
    createRule: 'admin',
    updateRule: 'admin',
    deleteRule: 'admin',
  },
}) {
  const [tempIdsGenerated, setTempIdsGenrated] = useState(false);
  const [chosenInterface, setChosenInterface] = useState('columns');
  const [schema, dispatch] = useReducer(reducer, currentSchema);

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

  const existingId = currentSchema.id;

  const isNew = useCallback(() => {
    return existingId === undefined;
  }, [existingId]);

  useEffect(() => {
    console.log('SETTING TEMP IDS');
    if (!isNew()) {
      addTempIds(schema.columns);
      setTempIdsGenrated(true);
    }
  }, [isNew]);

  return (
    <div className="table-form-container">
      <h1 className="table-form-header">
        {`${isNew() ? 'New' : 'Edit'} Table`}
      </h1>{' '}
      {tempIdsGenerated && (
        <form className="table-form">
          <div className="table-form-name">
            <FieldInput
              label="Table Name"
              type="text"
              value={schema.name}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_NAME', payload: e.target.value })
              }
              required={true}
              preventSpaces={true}
            />
          </div>
          <div className="table-form-navbar">
            <div
              className={`columns-btn ${
                chosenInterface === 'columns' ? 'active' : 'inactive'
              }`}
              onClick={() => setChosenInterface('columns')}
            >
              Columns
            </div>
            <div
              className={`rules-btn ${
                chosenInterface === 'rules' ? 'active' : 'inactive'
              }`}
              onClick={() => setChosenInterface('rules')}
            >
              API Rules
            </div>
          </div>
          <div className="interface">
            {chosenInterface === 'columns' ? (
              <div className="columns-interface">
                <AddColumnBar dispatch={dispatch} />
                {schema.columns.map((column) => {
                  return (
                    <ColumnInput
                      key={column.tempId}
                      column={column}
                      dispatch={dispatch}
                    />
                  );
                })}
              </div>
            ) : (
              <ApiRules schema={schema} dispatch={dispatch} />
            )}
          </div>
        </form>
      )}
      <div className="table-form-footer">
        <Button
          type="confirm"
          onClick={(e) => {
            e.preventDefault();
            const clone = { ...schema };
            removeTempIds(clone.columns);

            if (isNew()) {
              createTable(clone).then((newTable) => {
                console.log('new table', newTable);
                setTables((prev) => [...prev, newTable]);
                closeModal();
              });
            } else {
              editTable(currentSchema.id, clone).then((editedTable) => {
                console.log('edited table', editedTable);
                setTables((prev) =>
                  prev.map((table) =>
                    table.id === editedTable.id ? editedTable : table
                  )
                );
                closeModal();
              });
            }
          }}
        >
          {`${isNew() ? 'Add' : 'Edit'} Table`}
        </Button>
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            console.log('closing');
            closeModal();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
