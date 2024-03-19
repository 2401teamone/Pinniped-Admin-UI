import Settings from '../utils/Settings';
import Field from './fields/Field.jsx';

export default function ColumnOptions({ column, dispatch, tables }) {
  const removeColumn = () => {
    dispatch({ type: 'REMOVE_COLUMN', payload: column.tempId });
  };
  let columnOptions = null;

  switch (column.type) {
    case 'text':
      columnOptions = (
        <div>
          <Field
            label="minLength"
            value={column.options.minLength}
            type="number"
            onChange={(val) =>
              dispatch({
                type: 'EDIT_COLUMN',
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
                type: 'EDIT_COLUMN',
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
    case 'number':
      columnOptions = (
        <div>
          <Field
            label="min"
            value={column.options.min}
            type="number"
            onChange={(val) =>
              dispatch({
                type: 'EDIT_COLUMN',
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
                type: 'EDIT_COLUMN',
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
    case 'select':
      columnOptions = (
        <div>
          <Field
            label="maxSelect"
            value={column.options.maxSelect}
            type="number"
            onChange={(val) =>
              dispatch({
                type: 'EDIT_COLUMN',
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
                type: 'EDIT_COLUMN',
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
    case 'date':
      columnOptions = (
        <div>
          <Field
            label="min"
            value={column.options.min}
            type="date"
            onChange={(val) =>
              dispatch({
                type: 'EDIT_COLUMN',
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
                type: 'EDIT_COLUMN',
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
    case 'relation':
      columnOptions = (
        <div>
          <Field
            label="tableId"
            value={column.options.tableId}
            type="select"
            onChange={(val) =>
              dispatch({
                type: 'EDIT_COLUMN',
                payload: {
                  ...column,
                  options: { ...column.options, tableId: val[0] },
                },
              })
            }
            config={{
              required: true,
            }}
            options={{ options: tables.map((table) => table.id), maxSelect: 1 }}
          />
          <Field
            label="cascadeDelete"
            value={column.options.cascadeDelete}
            type="bool"
            onChange={(val) =>
              dispatch({
                type: 'EDIT_COLUMN',
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
    <div className="column-options">
      <div className="column-options-custom">
        <div>{columnOptions}</div>
      </div>
      <div className="column-options-standard">
        <Field
          label="required"
          type="bool"
          config={{ inline: true }}
          value={column.required}
          onChange={(val) => {
            dispatch({
              type: 'EDIT_COLUMN',
              payload: {
                ...column,
                required: val,
              },
            });
          }}
        />

        <Settings>
          <div className="settings-item" onClick={removeColumn}>
            Remove
          </div>
        </Settings>
      </div>
    </div>
  );
}
