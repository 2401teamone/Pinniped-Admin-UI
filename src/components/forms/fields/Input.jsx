import { useEffect, useRef } from "react";

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
}) {
  const inputRef = useRef();

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

  // useEffect(() => {
  //   const inputRefCurrent = inputRef.current;
  //   if () {
  //     return () => {
  //       inputRefCurrent.blur();
  //     };
  //   }
  // }, [value]);

  return (
    <input
      ref={inputRef}
      onKeyPressCapture={(e) => {
        console.log(e.key, "KEYPRESS");
        if (e.key === "Enter") {
          console.log("preventing default");
          e.preventDefault();
        }

        if (e.key === "Tab") {
          console.log("blurring");
          inputRef.current.blur();
        }
      }}
      className="field-input"
      type={type === "password" ? "password" : "text"}
      value={typeof value === "number" ? value.toString() : value}
      onChange={(e) => {
        console.log(e.target.value, "number check");
        console.log(type, "type", !/^\d+$/g.test(e.target.value));
        if (type === "number" && e.target.value === "") {
          onChange("");
        } else if (type === "number" && !/^\d+$/.test(e.target.value)) {
          console.log("preventing");
          return;
        } else {
          onChange(formatVal(e.target.value, type));
        }
      }}
      onBlur={(e) => {
        console.log("BLUR INPUT");
        let formattedVal = formatVal(e.target.value, type);
        if (handleValidation && validateOnBlur) handleValidation(formattedVal);
        if (handleSubmit) {
          console.log("submitting", e.target.value);
          handleSubmit(formattedVal);
        }
      }}
    />
  );
}
