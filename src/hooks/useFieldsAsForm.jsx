import { useState, useRef } from 'react';

export default function useFieldsAsForm(initialState = {}) {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [triggerValidation, setTriggerValidation] = useState(false);

  const indexes = useRef([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  indexes.current = [];

  console.log(indexes.current, 'indexes.current');

  const register = (label, type, validator) => {
    indexes.current = [...indexes.current, label];
    console.log(indexes.current, 'indexes');
    return {
      label,
      type,
      value: formState[label],
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
        setErrors(errors.filter((error) => error.label !== label));
        return '';
      },
      indexes: indexes.current,
      currentIdx,
      setCurrentIdx,
    };
  };

  const handleSubmit = (callback) => {
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
  };
}
