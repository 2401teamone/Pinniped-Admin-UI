import styled from "styled-components";

import Auth from "./Auth.jsx";
import Field from "../forms/fields/Field.jsx";
import Button from "../utils/Button.jsx";

import useFieldsAsForm from "../../hooks/useFieldsAsForm";

import { useAuthContext } from "../../hooks/useAuth";

import { useNotificationContext } from "../../hooks/useNotifications";

export default function Login() {
  const { register, handleSubmit } = useFieldsAsForm({
    username: "",
    password: "",
  });

  const { login } = useAuthContext();

  const {
    actionCreators: { showError },
  } = useNotificationContext();

  return (
    <Auth>
      <p>Admin Signin</p>
      <Form>
        <Field
          config={{ required: true, preventSpaces: true }}
          {...register("username", "text")}
        />

        <Field
          config={{ required: true, preventSpaces: true }}
          {...register("password", "password")}
        />

        <Button
          type="primary"
          expand={true}
          onClick={handleSubmit(async (formState) => {
            try {
              await login(formState);
            } catch (err) {
              showError(err.response.data.detail);
            }
          })}
        >
          Log In
        </Button>
      </Form>
    </Auth>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
