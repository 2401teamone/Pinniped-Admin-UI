// Dependencies
import { useState } from "react";

// API
import api from "../../api/api.js";

// Hooks
import { useNotificationContext } from "../../hooks/useNotifications";

// Components/styling
import Field from "./fields/Field.jsx";
import Button from "../utils/Button.jsx";
import FormFooter from "./misc/FormFooter.jsx";

import { RowFormWrapper } from "./RowForm";

// Utils
import getValidator from "../../utils/validators";

export default function EditRowForm({ table, row, setRows, closeModal }) {
  const [rowState, setRowState] = useState({ ...row });

  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();

  const handleSubmit = (column) => async (updatedVal) => {
    api
      .updateOne(table.id, row.id, {
        [column.name]: updatedVal,
      })
      .then((data) => {
        const rowId = data.row.id;
        setRows((prev) => {
          return prev.map((row) => {
            if (row.id === rowId) {
              return data.row;
            }
            return row;
          });
        });
        showStatus(`Updated ${row.id}'s ${column.name} to ${updatedVal}`);
      })
      .catch((err) => {
        showError(`Failed to update column: ${err.response.data.message}`);
      });
  };

  return (
    <RowFormWrapper>
      <h2 className="row-form-header">
        Edit <span>{table.name}</span> Row <span>{row.id}</span>
      </h2>
      <div className="row-form">
        {table.columns.map((column) => {
          if (column.system) return null;
          return (
            <div className="row-form-field" key={column.name}>
              <Field
                label={column.name}
                type={column.type}
                value={rowState[column.name]}
                required={column.required}
                onChange={(val) => {
                  setRowState((prevState) => {
                    return {
                      ...prevState,
                      [column.name]: val,
                    };
                  });
                }}
                handleSubmit={handleSubmit(column)}
                validator={(val) =>
                  getValidator(column.type)(
                    val,
                    column.options,
                    column.required
                  )
                }
                options={column.options}
                tabIndex={true}
              />
            </div>
          );
        })}
      </div>
      <FormFooter>
        <Button type="primary" onClick={closeModal}>
          Exit
        </Button>
      </FormFooter>
    </RowFormWrapper>
  );
}
