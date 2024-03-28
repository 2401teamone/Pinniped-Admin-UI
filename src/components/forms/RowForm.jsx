import api from "../../api/api.js";

import Field from "./fields/Field.jsx";
import Button from "../utils/Button.jsx";
import FormFooter from "./misc/FormFooter.jsx";

import getValidator from "../../utils/validators";

import { useNotificationContext } from "../../hooks/useNotifications";

import useFieldsAsForm from "../../hooks/useFieldsAsForm";

const generateInitialState = (columns) => {
  return columns.reduce((acc, column) => {
    switch (column.type) {
      case "bool":
        acc[column.name] = 0;
        break;
      case "date":
        acc[column.name] = new Date().toISOString().split("T")[0];
        break;
      case "relation":
        acc[column.name] = null;
        break;
      case "select":
        acc[column.name] = [];
        break;
      default:
        acc[column.name] = "";
    }

    return acc;
  }, {});
};

export default function RowForm({ table, setRows, closeModal, row }) {
  const isNewRow = row === null;
  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();
  const initialState = isNewRow
    ? generateInitialState(table.columns, isNewRow)
    : {};
  const { register, handleSubmit } = useFieldsAsForm(initialState);
  console.log(table.columns, "COLUMNNSNNSNSNSNNS");
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
          console.log(err);
          showError(`Invalid form inputs: ${err.response.data.message}`);
        });
    }
  };

  return (
    <div className="row-form-container">
      <h2 className="row-form-header">
        {isNewRow ? "New" : "Edit"} <span>{table.name}</span> Row
      </h2>
      <form className="row-form">
        {table.columns
          .filter((column) => column.type !== "creator")
          .map((column, idx) => {
            return (
              <div className="row-form-field" key={column.name}>
                <Field
                  options={column.options}
                  {...register(
                    column.name,
                    column.type,
                    (val) => getValidator(column.type)(val, column.options),
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
    </div>
  );
}
