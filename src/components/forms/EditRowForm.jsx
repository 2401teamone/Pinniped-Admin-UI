import { useState } from "react";

import api from "../../api/api.js";

import Field from "./fields/Field.jsx";
import Button from "../utils/Button.jsx";
import FormFooter from "./misc/FormFooter.jsx";

import getValidator from "../../utils/validators";

import { useNotificationContext } from "../../hooks/useNotifications";

export default function EditRowForm({ table, row, setRows, closeModal }) {
  const [rowState, setRowState] = useState({ ...row });

  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();

  return (
    <div className="row-form-container">
      <h2 className="row-form-header">
        Edit<span>{table.name}</span> Row
      </h2>
      <div className="row-form">
        {table.columns.map((column) => {
          if (column.system) return null;
          return (
            <div className="row-form-field" key={column.name}>
              <Field
                label={column.name}
                type={column.type}
                value={row[column.name]}
                onChange={(val) => {
                  console.log(val, "changing");
                  setRowState((prevState) => {
                    return {
                      ...prevState,
                      [column.name]: val,
                    };
                  });
                }}
                handleSubmit={async (updatedVal) => {
                  console.log("update", updatedVal);
                  const data = await api.updateOne(table.id, row.id, {
                    [column.name]: updatedVal,
                  });
                  console.log(data.row);
                }}
                options={column.options}
                tabIndex={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
