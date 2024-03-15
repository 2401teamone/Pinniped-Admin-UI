import { useState, useEffect, useReducer, useCallback } from 'react';

import AddColumnBar from './AddColumnBar.jsx';
import ColumnInput from './ColumnInput.jsx';
import Field from './fields/Field.jsx';
import Button from '../utils/Button.jsx';
import ApiRules from './ApiRules.jsx';
import EditTableSettings from './misc/EditTableSettings.jsx';

import { createTable, editTable } from '../../api/schema.js';

import { useNotificationContext } from '../../hooks/useNotifications';

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
  const [tempIdsGenerated, setTempIdsGenerated] = useState(false);
  const [chosenInterface, setChosenInterface] = useState('columns');

  const [schema, dispatch] = useReducer(reducer, currentSchema);

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

  useEffect(() => {
    console.log('SETTING TEMP IDS');
    if (!isNew()) {
      addTempIds(schema.columns);
    }
    setTempIdsGenerated(true);
  }, [isNew]);

  return (
    <div className="table-form-container">
      <div onClick={() => showStatus('status')}>test notification</div>
      <div onClick={() => showError('errorrrr')}>test error</div>
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
              isValid={(val) => {
                if (val.length < 3) {
                  return 'Name must be at least 3 characters';
                }
                return '';
              }}
            />
            {/* <Field
              // label="Table Type"
              type="select"
              value={schema.name}
              onChange={(option) =>
                dispatch({ type: 'UPDATE_NAME', payload: option })
              }
              config={{ options: ['abc', 'def'], inline: true }}
            />
            <Field
              // label="Table Date"
              type="date"
              value={schema.date || Date.now()}
              onChange={
                (date) => console.log(date)
                // dispatch({ type: 'UPDATE_NAME', payload: date })
              }
              config={{ inline: true }}
            />
            <Field
              // label="Table Date"
              type="bool"
              value={schema.bool}
              onChange={
                (val) => console.log(val)
                // dispatch({ type: 'UPDATE_NAME', payload: date })
              }
              config={{ inline: true }}
            />
            <Field
              label="Table Relation"
              type="relation"
              value={schema.relation}
              onChange={(newRel) => console.log(newRel)}
              config={{ tableId: 'be2d98d4-175c-44b9-a806-fb068c4eca7b' }}
            />
            <Field
              label="Table Json"
              type="json"
              value={schema.json}
              onChange={(json) => console.log(json)}
            /> */}
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
      <div className="table-form-footer">
        <Button
          type="confirm"
          onClick={async (e) => {
            e.preventDefault();
            const clone = { ...schema };
            removeTempIds(clone.columns);
            console.log(clone);

            if (isNew()) {
              createTable(clone).then((newTable) => {
                console.log('new table', newTable);
                setTables((prev) => [...prev, newTable]);
                closeModal();
              });
            } else {
              const editedTable = await editTable(currentSchema.id, clone);

              setTables((prev) => {
                console.log('setting table state');
                return prev.map((table) =>
                  table.id === editedTable.id ? editedTable : table
                );
              });
              closeModal();
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
