import { useState } from "react";

import api from "../../api/api.js";

import Field from "./fields/Field.jsx";
import Button from "../utils/Button.jsx";
import FormFooter from "./misc/FormFooter.jsx";

import getValidator from "../../utils/validators";

import { useNotificationContext } from "../../hooks/useNotifications";

import useFieldsAsForm from "../../hooks/useFieldsAsForm";

export default function EditAuthForm({ table, row, setRows, closeModal }) {
  const [rowState, setRowState] = useState({ ...row });
  const [changePassword, setChangePassword] = useState(0);

  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();

  const { register, handleSubmit, formState } = useFieldsAsForm({
    password: "",
    passwordConfirm: "",
  });

  return (
    <div className="row-form-container">
      <h2 className="row-form-header">
        Edit Users Row <span>{row.id}</span>
      </h2>
      <div className="row-form">
        <div className="row-form-field">
          <Field
            label="username"
            type="username"
            value={rowState["username"]}
            required={true}
            onChange={(val) => {
              setRowState((prevState) => {
                return {
                  ...prevState,
                  username: val,
                };
              });
            }}
            handleSubmit={async (updatedVal) => {
              api
                .updateUsername(row.id, updatedVal)
                .then((data) => {
                  const rowId = data.data.id;
                  setRows((prev) => {
                    return prev.map((row) => {
                      if (row.id === rowId) {
                        return data.data;
                      }
                      return row;
                    });
                  });

                  showStatus(`Updated ${row.id}'s username to ${updatedVal}`);
                })
                .catch((err) => {
                  showError(
                    `Failed to update column: ${err.response.data.message}`
                  );
                });
            }}
            validator={(val) => {
              const validatorFn = getValidator("username");
              if (validatorFn) {
                const errorMessage = validatorFn(val, {}, true);
                if (errorMessage) {
                  return errorMessage;
                }
              }

              return "";
            }}
            tabIndex={true}
          />
          <Field
            label="Change Password"
            type="bool"
            value={changePassword}
            onChange={(val) => {
              setChangePassword(val);
            }}
          />

          {!changePassword ? (
            ""
          ) : (
            <div className="change-password">
              <div className="row-form-flex">
                <Field
                  {...register(
                    "password",
                    "password",
                    (val) => {
                      if (val.length < table.options.minPasswordLength) {
                        return `Password must be at least ${table.options.minPasswordLength} characters long`;
                      }
                      if (!new RegExp(table.options.pattern).test(val)) {
                        return `Invalid password`;
                      }
                      return "";
                    },
                    true
                  )}
                  tabIndex={true}
                  required={true}
                />
                <Field
                  {...register(
                    "passwordConfirm",
                    "password",
                    () => {
                      if (formState.passwordConfirm !== formState.password) {
                        return "Passwords do not match";
                      }
                      return "";
                    },
                    true
                  )}
                  tabIndex={true}
                  required={true}
                />
              </div>
              <div className="change-password-btn">
                <Button
                  type="primary"
                  onClick={handleSubmit((formState, errors) => {
                    if (errors.length) {
                      showError(
                        "Failed to update password: Please correct the errors"
                      );
                      return;
                    }
                    api
                      .changePassword(row.id, formState.password)
                      .then(() => {
                        showStatus("Password updated successfully");
                        setChangePassword(0);
                      })
                      .catch((err) => {
                        showError(
                          `Failed to update password: ${err.response.data.message}`
                        );
                      });
                  })}
                >
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="auth-separator"></div>
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
                handleSubmit={async (updatedVal) => {
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

                      showStatus(
                        `Updated ${row.id}'s ${column.name} to ${updatedVal}`
                      );
                    })
                    .catch((err) => {
                      showError(
                        `Failed to update column: ${err.response.data.message}`
                      );
                    });
                }}
                validator={(val) => {
                  const validatorFn = getValidator(column.type);
                  if (validatorFn) {
                    const errorMessage = validatorFn(
                      val,
                      column.options,
                      column.required
                    );
                    if (errorMessage) {
                      return errorMessage;
                    }
                  }

                  return "";
                }}
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
    </div>
  );
}
