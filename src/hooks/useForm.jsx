import { useState, useRef } from 'react';

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // const inputsRef = useRef({});

  // const control = inputsRef.current;

  // const validate = (name, value) => {

  // };

  const register = (name) => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      // setTouched({ ...touched, [e.target.name]: true });
      setValues({ ...values, [name]: value });
    };

    return {
      name,
      value: values[name] || '',
      onChange: handleInputChange,
      type: 'text',
    };
  };

  const reset = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (cb) => {
    return (e) => {
      e.preventDefault();
      cb(e);
    };
  };

  return {
    register,
    handleSubmit,
    errors,
    values,
    reset,
  };
};

export default useForm;
