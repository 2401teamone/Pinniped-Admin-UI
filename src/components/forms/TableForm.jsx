import { useState, useEffect, useReducer, useCallback } from 'react';

import { useLocation } from 'wouter';

import api from '../../api/api.js';

import { useNotificationContext } from '../../hooks/useNotifications';

import AddColumnBar from './AddColumnBar.jsx';
import ColumnInput from './ColumnInput.jsx';
import Field from './fields/Field.jsx';
import Button from '../utils/Button.jsx';
import ApiRules from './ApiRules.jsx';
import EditTableSettings from './misc/EditTableSettings.jsx';
import FormFooter from './misc/FormFooter.jsx';

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
  tables,
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
  const [tempIdsGenerated, setTempIdsGenerated] = useState(false);
  const [chosenInterface, setChosenInterface] = useState('columns');

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

  const existingId = currentSchema.id;

  const isNew = useCallback(() => {
    return existingId === undefined;
  }, [existingId]);

  const handleSubmit = async (e) => {
    const validate = (schema) => {
      const errors = [];
      if (!schema.name.length) {
        errors.push('Table name is required.');
      }
      if (!schema.name.match(/^[a-zA-Z0-9_]+$/)) {
        errors.push('Table name must be alphanumeric and contain no spaces.');
      }
      if (schema.name.length > 20) {
        errors.push('Table name must be 20 characters or less.');
      }

      if (
        tables.some((table) => {
          if (isNew() && table.name === schema.name) {
            return true;
          } else if (
            !isNew() &&
            table.name === schema.name &&
            table.id !== existingId
          ) {
            return true;
          }
        })
      ) {
        errors.push('Table name must be unique.');
      }

      if (!schema.columns.length) {
        errors.push('At least one column is required.');
      }
      if (!schema.columns.every((column) => column.name.length)) {
        errors.push('All columns must have a name.');
      }
      if (!schema.columns.every((column) => column.type)) {
        errors.push('All columns must have a type.');
      }

      let colNames = schema.columns.map((column) => column.name);
      if (colNames.length !== new Set(colNames).size) {
        errors.push('Column names must be unique.');
      }

      return errors;
    };

    e.preventDefault();
    const clone = { ...schema };
    console.log(clone);

    const errors = validate(clone);
    if (errors.length) {
      showError(errors);
      return;
    }

    removeTempIds(clone.columns);

    try {
      if (isNew()) {
        const { table: createdTable } = await api.createTable(clone);
        console.log(createdTable, 'created table');
        setTables((prev) => [...prev, createdTable]);
      } else {
        const { table: editedTable } = await api.editTable(
          currentSchema.id,
          clone
        );
        console.log(editedTable, 'edited table');
        setTables((prev) => {
          return prev.map((table) =>
            table.id === editedTable.id ? editedTable : table
          );
        });
      }
      showStatus(`Table successfully ${isNew() ? 'created' : 'edited'}`);
      closeModal();
      setLocation(`/data?table=${clone.name}`);
    } catch (err) {
      showError(err.message);
    }
  };

  useEffect(() => {
    console.log('SETTING TEMP IDS');
    if (!isNew()) {
      addTempIds(schema.columns);
    }
    setTempIdsGenerated(true);
  }, [isNew]);

  return (
    <div className="table-form-container">
      <div className="table-form-header-container">
        <h2 className="table-form-header">
          {`${isNew() ? 'New' : `Edit ${tableName}`} Table`}
        </h2>{' '}
        {!isNew() && (
          <EditTableSettings
            tableId={currentSchema.id}
            closeModal={closeModal}
            setTables={setTables}
          />
        )}
      </div>
      {tempIdsGenerated && (
        <form className="table-form">
          <div className="table-form-name">
            <Field
              label="Table Name"
              type="text"
              value={schema.name}
              onChange={(val) =>
                dispatch({ type: 'UPDATE_NAME', payload: val })
              }
              config={{ required: true, preventSpaces: true }}
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
                <div className="actual-columns">
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
              </div>
            ) : (
              <ApiRules schema={schema} dispatch={dispatch} />
            )}
          </div>
        </form>
      )}
      <FormFooter>
        <Button type="confirm" onClick={handleSubmit}>
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
      </FormFooter>
    </div>
  );
}
