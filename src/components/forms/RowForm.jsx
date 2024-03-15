import { createOne } from '../../api/crud.js';

import Field from './fields/Field.jsx';
import Button from '../utils/Button.jsx';
import FormFooter from './misc/FormFooter.jsx';

import getValidator from '../../utils/validators';

import { useNotificationContext } from '../../hooks/useNotifications';

import useRowFormReducer from '../../hooks/useRowFormReducer';

export default function RowForm({ table, setRows, closeModal, row }) {
  const initialState =
    row ||
    table.columns.reduce((acc, column) => {
      acc[column.name] =
        column.type === 'number' || column.type === 'bool'
          ? 0
          : column.type === 'select'
          ? ''
          : '';
      return acc;
    }, {});
  const { formState, onChange, setError, clearError } =
    useRowFormReducer(initialState);
  console.log('formState: ', formState);

  const {
    actionCreators: { showError },
  } = useNotificationContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting: ', formState);
    if (formState.error) {
      showError('Invalid form inputs');
      return;
    }

    delete formState.error;
    createOne(table.id, formState).then((res) => {
      console.log('Received ', res.data, 'upon create row');
      setRows((prev) => [...prev, res.data.row]);
      closeModal();
    });
  };

  return (
    <div className="row-form-container">
      <h2 className="row-form-header">
        New <span>{table.name}</span> Row
      </h2>
      <form className="row-form">
        {table.columns.map((column) => {
          return (
            <div className="row-form-field" key={column.name}>
              <Field
                label={column.name}
                type={column.type}
                value={formState[column.name]}
                config={{
                  options:
                    column.type === 'select' ? column.options.options : [],
                }}
                onChange={(val) => onChange(column.name, val)}
                validator={(val) => {
                  const validatorFn = getValidator(column.type);
                  const err = validatorFn(val, column.options);
                  if (err) {
                    setError(err);
                    return err;
                  } else {
                    clearError();
                    return '';
                  }
                }}
              />
            </div>
          );
        })}
      </form>
      <FormFooter>
        <Button type="confirm" onClick={handleSubmit}>
          Add Row
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
