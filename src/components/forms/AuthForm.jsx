import api from "../../api/api.js";

import Field from "./fields/Field.jsx";
import Button from "../utils/Button.jsx";
import FormFooter from "./misc/FormFooter.jsx";

import getValidator from "../../utils/validators";

import { useNotificationContext } from "../../hooks/useNotifications";

import useFieldsAsForm from "../../hooks/useFieldsAsForm";

export default function AuthForm({ table, setRows, closeModal }) {
  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();

  const initialState = { username: "", password: "", passwordConfirm: "" };

  const { register, handleSubmit, formState } = useFieldsAsForm(initialState);

  const onSubmit = (formState, errors) => {
    console.log(formState, "FORMSTATE");
    if (errors.length) {
      showError("Invalid form inputs");
      return;
    }

    api
      .registerUser(formState)
      .then((data) => {
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
          <Field
            {...register(
              "password",
              "password",
              (val) => {
                const validator = getValidator("password");
                return validator(val);
              },
              true
            )}
            tabIndex={true}
            required={true}
          />
        </div>
        <div className="row-form-field">
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
