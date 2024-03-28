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

export default function AuthForm({ table, setRows, closeModal }) {
  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();

  const credentials = { username: "", password: "", passwordConfirm: "" };

  const { register, handleSubmit, formState } = useFieldsAsForm({
    ...credentials,
    ...generateInitialState(table.columns),
  });

  const onSubmit = (formState, errors) => {
    if (errors.length) {
      console.log(errors, "ERRORS", formState);
      showError("Invalid form inputs");
      return;
    }

    api
      .registerUser(formState)
      .then((data) => {
        console.log(data, "RETURNED");
        setRows((prev) => [...prev, data.data]);
        showStatus("User registered successfully");
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        showError(`Invalid form inputs: ${err.response.data.message}`);
      });
  };

  return (
    <div className="row-form-container">
      <h2 className="row-form-header">Add User</h2>
      <form className="row-form">
        <div className="row-form-field">
          <Field
            {...register("username", "text", undefined, true)}
            tabIndex={true}
            required={true}
          />
        </div>
        <div className="row-form-field">
          <div className="row-form-flex">
            <Field
              {...register(
                "password",
                "password",
                (val) => {
                  if (val.length < 10) {
                    return "Password must be at least 10 characters long";
                  }
                  if (!/(?=.*d)(?=.*[!@#$%^&*])/.test(val)) {
                    return "Password must contain at least one digit and one special character";
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
        </div>
        <div className="auth-separator"></div>
        {table.columns.map((column, idx) => {
          return (
            <div className="row-form-field" key={column.name}>
              <Field
                options={column.options}
                {...register(
                  column.name,
                  column.type,
                  (val) => {
                    console.log("VALIDATING", val, column.type, column.options);
                    const validatorFn = getValidator(column.type);
                    return validatorFn(val, column.options);
                  },
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
          Register User
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
