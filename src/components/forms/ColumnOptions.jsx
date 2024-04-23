import styled from "styled-components";

import Settings from "../utils/Settings";
import Field from "./fields/Field.jsx";

import { useConfirmModalContext } from "../../hooks/useConfirmModal";

const creatorRuleExists = (schema) => {
  const { getAllRule, getOneRule, createRule, updateRule, deleteRule } = schema;
  return [getAllRule, getOneRule, createRule, updateRule, deleteRule].includes(
    "creator"
  );
};

export default function ColumnOptions({ schema, column, dispatch, tables }) {
  const {
    actionCreators: { open },
  } = useConfirmModalContext();

  const removeColumn = () => {
    if (column.type === "creator" && creatorRuleExists(schema)) {
      open("You need to adjust your API Rules to remove creator constraints.");
    } else {
      dispatch({ type: "REMOVE_COLUMN", payload: column.tempId });
    }
  };
  let columnOptions = null;

  switch (column.type) {
    case "text":
      columnOptions = (
        <div className="column-options-custom-row">
          <Field
            label="minLength"
            value={column.options.minLength}
            type="number"
            onChange={(val) =>
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, minLength: val },
                },
              })
            }
            config={{ inline: true }}
          />
          <Field
            label="maxLength"
            value={column.options.maxLength}
            type="number"
            onChange={(val) =>
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, maxLength: val },
                },
              })
            }
            config={{ inline: true }}
          />
        </div>
      );
      break;
    case "number":
      columnOptions = (
        <div className="column-options-custom-row">
          <Field
            label="min"
            value={column.options.min}
            type="number"
            onChange={(val) =>
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, min: val },
                },
              })
            }
            config={{ inline: true }}
          />
          <Field
            label="max"
            value={column.options.max}
            type="number"
            onChange={(val) =>
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, max: val },
                },
              })
            }
            config={{ inline: true }}
          />
        </div>
      );
      break;
    case "select":
      columnOptions = (
        <div className="column-options-custom-row">
          <Field
            label="maxSelect"
            value={column.options.maxSelect}
            type="number"
            onChange={(val) =>
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, maxSelect: val },
                },
              })
            }
            config={{ inline: true }}
          />
          <Field
            label="options"
            value={column.options.options}
            type="csv"
            onChange={(val) =>
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, options: val },
                },
              })
            }
            config={{ inline: true }}
          />
        </div>
      );
      break;
    case "date":
      columnOptions = (
        <div className="column-options-custom-row">
          <Field
            label="min"
            value={column.options.min}
            type="date"
            onChange={(val) =>
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, min: val },
                },
              })
            }
            config={{ inline: true }}
          />
          <Field
            label="max"
            value={column.options.max}
            type="date"
            onChange={(val) =>
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, max: val },
                },
              })
            }
            config={{ inline: true }}
          />
        </div>
      );
      break;
    case "relation":
      columnOptions = (
        <div className="column-options-custom-row">
          <Field
            label="Table Name"
            value={column.options.tableId}
            type="select"
            onChange={(val) => {
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, tableId: val[0] },
                },
              });
            }}
            config={{
              required: true,
            }}
            options={{
              options: tables
                .filter((table) => table.name !== "admins")
                .map((table) => {
                  return { label: table.name, val: table.id };
                }),
              maxSelect: 1,
            }}
          />
          <Field
            label="Cascade Delete"
            value={column.options.cascadeDelete}
            type="bool"
            onChange={(val) =>
              dispatch({
                type: "EDIT_COLUMN",
                payload: {
                  ...column,
                  options: { ...column.options, cascadeDelete: val },
                },
              })
            }
            config={{ required: true }}
          />
        </div>
      );
      break;
  }

  return (
    <ColumnOptionsWrapper>
      <div className="column-options">
        <div className="column-options-custom">
          <div>{columnOptions}</div>
        </div>
        <div className="column-options-standard">
          {column.type === "creator" ? (
            ""
          ) : (
            <Field
              label="required"
              type="bool"
              config={{ inline: true }}
              value={column.required}
              onChange={(val) => {
                dispatch({
                  type: "EDIT_COLUMN",
                  payload: {
                    ...column,
                    required: val,
                  },
                });
              }}
            />
          )}

          <Settings>
            <div className="settings-item" onClick={removeColumn}>
              Remove
            </div>
          </Settings>
        </div>
      </div>
    </ColumnOptionsWrapper>
  );
}

const ColumnOptionsWrapper = styled.div`
  & .column-options {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    border-top: 1px solid var(--pk);
    width: 100%;
    padding: 15px;

    & .column-options-custom {
      & .column-options-custom-row {
        display: flex;
        flex-grow: 1;
        gap: 25px;
      }
    }

    & .column-options-custom {
      margin-bottom: 10px;
    }

    & .column-options-standard {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
  }
`;
