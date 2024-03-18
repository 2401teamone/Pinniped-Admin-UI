import api from '../../api/api.js';

import Field from './fields/Field.jsx';
import Button from '../utils/Button.jsx';
import FormFooter from './misc/FormFooter.jsx';

import getValidator from '../../utils/validators';

import { useNotificationContext } from '../../hooks/useNotifications';

import useFieldsAsForm from '../../hooks/useFieldsAsForm';

const generateInitialState = (columns) => {
  return columns.reduce((acc, column) => {
    acc[column.name] =
      column.type === 'number' || column.type === 'bool'
        ? 0
        : column.type === 'select'
        ? ''
        : '';
    return acc;
  }, {});
};

export default function RowForm({ table, setRows, closeModal, row }) {
  const isNewRow = row === null;
  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();
  const initialState = isNewRow ? generateInitialState(table.columns) : {};
  const { register, handleSubmit } = useFieldsAsForm(initialState);

  const onSubmit = (formState, errors) => {
    console.log(formState, errors, 'SUBMITTING');
    if (errors.length) {
      showError('Invalid form inputs');
      console.log('error: ', errors);
      return;
    }

    if (isNewRow) {
      api
        .createOne(table.id, formState)
        .then((data) => {
          console.log('Received ', data, 'upon create row');
          setRows((prev) => [...prev, data.row]);
          showStatus('Row added successfully');
          closeModal();
        })
        .catch(() => {
          showError('Invalid form inputs');
        });
    } else {
      //update one
    }
  };

  return (
    <div className="row-form-container">
      <h2 className="row-form-header">
        {isNewRow ? 'New' : 'Edit'} <span>{table.name}</span> Row
      </h2>
      <form className="row-form">
        {table.columns.map((column) => {
          return (
            <div className="row-form-field" key={column.name}>
              <Field
                config={{
                  options:
                    column.type === 'select' ? column.options.options : [],
                }}
                {...register(column.name, column.type, (val) => {
                  const validatorFn = getValidator(column.type);
                  return validatorFn(val, column.options);
                })}
              />
            </div>
          );
        })}
      </form>
      <FormFooter>
        <Button type="confirm" onClick={handleSubmit(onSubmit)}>
          {isNewRow ? 'Add Row' : 'Save Changes'}
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
