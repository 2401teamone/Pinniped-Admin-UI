import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const formatVal = (val, type) => {
  let formattedVal;
  switch (type) {
    case "number":
      formattedVal = Number(val);
      break;
    case "csv":
      formattedVal = val.split(",");
      break;
    default:
      formattedVal = val;
      break;
  }

  return formattedVal;
};

export default function Input({
  type,
  config,
  value,
  onChange,
  handleValidation,
  handleSubmit,
  validateOnBlur,
  editing,
  error,
}) {
  const inputRef = useRef();

  const [initialValue] = useState(value);

  useEffect(() => {
    const refVar = inputRef.current;
    const handler = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        e.target.value += "_";
      }
    };
    if (config.preventSpaces) {
      refVar.addEventListener("keydown", handler);
    }
    if (editing) {
      inputRef.current.focus();
    }
    return () => {
      if (config.preventSpaces) {
        refVar.removeEventListener("keydown", handler);
      }
    };
  });

  return (
    <InputContainer
      ref={inputRef}
      onKeyPressCapture={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
        if (e.key === "Tab") {
          inputRef.current.blur();
        }
      }}
      className="field-input"
      type={type === "password" ? "password" : "text"}
      value={typeof value === "number" ? value.toString() : value}
      onChange={(e) => {
        if (error.length) handleValidation(formatVal(e.target.value, type));
        if (type === "number" && e.target.value === "") {
          onChange("");
        } else if (type === "number" && !/^\d+$/.test(e.target.value)) {
          return;
        } else {
          onChange(formatVal(e.target.value, type));
        }
      }}
      onBlur={(e) => {
        let formattedVal = formatVal(e.target.value, type);
        if (handleValidation && validateOnBlur) handleValidation(formattedVal);
        if (handleSubmit && initialValue !== formattedVal) {
          handleSubmit(formattedVal);
        }
      }}
    />
  );
}

const InputContainer = styled.input`
  font-size: 1rem;
  background-color: inherit;
  width: 100%;
  height: inherit;
`;
