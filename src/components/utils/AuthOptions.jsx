import Field from "../forms/fields/Field.jsx";

export default function AuthOptions({ schema, dispatch }) {
  return (
    <div className="auth-options">
      <Field
        label="minUsernameLength"
        type="number"
        value={schema.options.minUsernameLength}
        onChange={(val) =>
          dispatch({
            type: "EDIT_OPTIONS",
            payload: { ...schema.options, minUsernameLength: val },
          })
        }
      />
      <Field
        label="minPasswordLength"
        type="number"
        value={schema.options.minPasswordLength}
        onChange={(val) =>
          dispatch({
            type: "EDIT_OPTIONS",
            payload: { ...schema.options, minPasswordLength: val },
          })
        }
      />
      <Field
        label="pattern"
        type="text"
        value={schema.options.pattern}
        onChange={(val) =>
          dispatch({
            type: "EDIT_OPTIONS",
            payload: { ...schema.options, pattern: val },
          })
        }
        validator={(val) => {
          try {
            new RegExp(val);
            return "";
          } catch (e) {
            return "Invalid regex pattern";
          }
        }}
        validatorContext="Must follow a regex pattern //"
      />
    </div>
  );
}
