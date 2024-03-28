import { useState } from "react";

import { handleRequiredField } from "../utils/validators";

export default function useFieldsAsForm(initialState = {}) {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [triggerValidation, setTriggerValidation] = useState(false);

  const register = (label, type, validator, required) => {
    return {
      label,
      type,
      value: formState[label],
      required,
      triggerValidation,
      setTriggerValidation,
      onChange: (val) => setFormState({ ...formState, [label]: val }),
      validator: (val) => {
        if (validator) {
          const errorMessage = validator(val);
          if (errorMessage) {
            setErrors([...errors, { label, errorMessage }]);
            return errorMessage;
          }
        }
        if (required) {
          const requiredError = handleRequiredField(type, val);
          const errorMessage = `${label} is required`;
          if (requiredError) {
            setErrors((prev) => [...prev, { label, errorMessage }]);
            return errorMessage;
          }
        }
        setErrors(errors.filter((error) => error.label !== label));
        return "";
      },
    };
  };

  const handleSubmit = (callback) => {
    document.onkeydown = (e) => {
      if (e.metaKey && e.key === "Enter") {
        e.preventDefault();
        setTriggerValidation(true);
        callback(formState, errors);
      }
    };

    return (e) => {
      e.preventDefault();
      setTriggerValidation(true);
      callback(formState, errors);
    };
  };

  return {
    register,
    handleSubmit,
    errors,
    formState,
  };
}
