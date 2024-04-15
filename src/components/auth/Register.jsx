import Auth from "./Auth.jsx";
import Field from "../forms/fields/Field.jsx";
import Button from "../utils/Button.jsx";

import useFieldsAsForm from "../../hooks/useFieldsAsForm";

import { useAuthContext } from "../../hooks/useAuth";
import { useNotificationContext } from "../../hooks/useNotifications";

export default function Register() {
  const { register, handleSubmit } = useFieldsAsForm({
    username: "",
    password: "",
  });

  const { register: signup } = useAuthContext();

  const {
    actionCreators: { showError, showStatus },
  } = useNotificationContext();

  return (
    <Auth>
      <p>Admin Registration</p>
      <Field
        config={{ required: true, preventSpaces: true }}
        {...register("username", "text", (val) => {
          if (val.length < 4) {
            return "Username must be at least 4 characters";
          } else return "";
        })}
      />

      <Field
        config={{ required: true, preventSpaces: true }}
        {...register("password", "password", (val) => {
          if (val.length < 10) {
            return "Password must be at least 10 characters";
          } else if (!/(?=.*\d)(?=.*[!@#$%^&*])/.test(val)) {
            return "Password must contain at least one number and one special character";
          } else return "";
        })}
      />

      <Button
        type="primary"
        expand={true}
        onClick={handleSubmit(async (formState, errors) => {
          if (errors.length) {
            showError("Invalid form inputs");
            return;
          }
          await signup(formState);
        })}
      >
        Register
      </Button>
    </Auth>
  );
}
