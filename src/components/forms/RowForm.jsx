// Dependencies
import styled from "styled-components";

// API
import api from "../../api/api.js";

// Hooks
import { useNotificationContext } from "../../hooks/useNotifications";
import useFieldsAsForm from "../../hooks/useFieldsAsForm";

// Components/styling
import Field from "./fields/Field.jsx";
import Button from "../utils/Button.jsx";
import FormFooter from "./misc/FormFooter.jsx";
import getValidator from "../../utils/validators";

export default function RowForm({ table, setRows, closeModal, row }) {
  const isNewRow = row === null;

  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();

  const initialState = isNewRow ? table.generateInitialState() : {};

  const { register, handleSubmit } = useFieldsAsForm(initialState);

  const onSubmit = (formState, errors) => {
    if (errors.length) {
      showError("Invalid form inputs");
      return;
    }
    if (isNewRow) {
      api
        .createOne(table.id, formState)
        .then((data) => {
          setRows((prev) => [...prev, data.row]);
          showStatus("Row added successfully");
          closeModal();
        })
        .catch((err) => {
          showError(`Invalid form inputs: ${err.response.data.message}`);
        });
    }
  };

  return (
    <RowFormWrapper>
      <h2 className="row-form-header">
        {isNewRow ? "New" : "Edit"} <span>{table.name}</span> Row
      </h2>
      <form className="row-form">
        {table.columns
          .filter((column) => !column.system)
          .map((column, idx) => {
            return (
              <div className="row-form-field" key={column.name}>
                <Field
                  options={column.options}
                  {...register(
                    column.name,
                    column.type,
                    (val) =>
                      getValidator(column.type)(
                        val,
                        column.options,
                        column.required
                      ),
                    column.required
                  )}
                  tabIndex={true}
                  focusOnMount={idx === 0}
                />
              </div>
            );
          })}
      </form>
      <FormFooter>
        <Button type="confirm" onClick={handleSubmit(onSubmit)}>
          {isNewRow ? "Add Row" : "Save Changes"}
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
    </RowFormWrapper>
  );
}

export const RowFormWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  & .row-form-header {
    margin: 20px 0 30px 0;
    padding: 0 var(--modal-padding);
    font-size: 1.5rem;

    & span {
      font-weight: 800;
    }
  }

  & .row-form {
    padding: 0 var(--modal-padding);
    margin-bottom: 50px;
    flex-grow: 1;
    overflow-y: scroll;
    height: inherit;

    & .row-form-field {
      margin: 10px 0;

      & .row-form-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }

      & .change-password-btn {
        display: flex;
        justify-content: end;
      }
    }
  }
`;
