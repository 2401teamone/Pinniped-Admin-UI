import api from "../../api/api.js";
import styled from "styled-components";

import Field from "./fields/Field.jsx";
import Button from "../utils/Button.jsx";
import FormFooter from "./misc/FormFooter.jsx";

import { useNotificationContext } from "../../hooks/useNotifications";

import useFieldsAsForm from "../../hooks/useFieldsAsForm";
import getValidator from "../../utils/validators";
import Table from "../../utils/table";

export default function AuthForm({ table, setRows, closeModal }) {
  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();

  const credentials = { username: "", password: "", passwordConfirm: "" };

  let tableInstance = new Table(table);

  const { register, handleSubmit, formState } = useFieldsAsForm({
    ...credentials,
    ...tableInstance.generateInitialState(),
  });

  const onSubmit = (formState, errors) => {
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
        showError(`Invalid form inputs: ${err.response.data.message}`);
      });
  };

  return (
    <RowFormWrapper className="row-form-container">
      <h2 className="row-form-header">Add User</h2>
      <form className="row-form">
        <div className="row-form-field">
          <Field
            {...register(
              "username",
              "text",
              () => {
                if (
                  formState.username.length < table.options.minUsernameLength
                ) {
                  return `Username must be at least ${table.options.minUsernameLength} characters long`;
                }
                return "";
              },
              true
            )}
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
        </div>
        <Separator></Separator>
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

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--pk);
  margin: 5px 0 25px 0;
`;
