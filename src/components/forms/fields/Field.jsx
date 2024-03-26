import { useState, useEffect, useCallback, useRef } from "react";

import { format } from "date-fns";

import Type from "../../utils/Type";

import Input from "./Input";
import Select from "./Select";
import Bool from "./Bool";
import Calendar from "./Calendar";
import Relation from "./Relation";
import Json from "./Json";

import Panel from "../../utils/Panel";

export default function Field({
  label,
  type,
  value,
  onChange,
  handleSubmit,
  onClose,
  validator,
  validatorContext,
  triggerValidation,
  setTriggerValidation,
  validateOnBlur = true,
  config = {
    inline: false,
    preventSpaces: false,
  },
  options,
  children,
  placeholder = null,
  required = false,
  disable = false,
  tabIndex = true,
  focusOnMount = false,
}) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  const fieldRef = useRef();

  let displayComponent = null;
  let editComponent = null;

  const handleSelectFormatting = (options) => {
    const option = options.find((option) => option.val === value);
    return option ? option.label : value;
  };

  const handleRequiredField = useCallback((type, val) => {
    switch (type) {
      case "text":
      case "number":
      case "password":
      case "email":
      case "url":
      case "date":
      case "json":
        return val === "";
      case "relation":
        console.log("REQUIRED RELATION CHECKING", val);
        return val === null;
      case "csv":
      case "select":
        return val.length === 0;
      default:
        return false;
    }
  }, []);

  const handleValidation = useCallback(
    (val) => {
      if (validator) {
        if (required) {
          const requiredError = handleRequiredField(type, val);
          if (requiredError) {
            setError("This field is required");
            return false;
          }
        }

        const errorMessage = validator(val);
        if (errorMessage) {
          setError(errorMessage);
          return false;
        }
      }
      setError("");
      return true;
    },
    [validator, required, handleRequiredField, type]
  );

  useEffect(() => {
    const el = fieldRef.current;
    const handler = (e) => {
      if (!editing && !disable) {
        e.stopPropagation();
        setEditing(true);
      }
    };
    if (type !== "bool") {
      el.addEventListener("click", handler, true);

      return () => {
        el.removeEventListener("click", handler, true);
      };
    }
  }, [label, editing, disable, type]);

  const closeAndBlurInput = () => {
    const inputEl = fieldRef.current.querySelector(".field-input");
    if (inputEl) {
      inputEl.blur();
    }
    setEditing(false);
  };

  useEffect(() => {
    const handler = (e) => {
      e.stopPropagation();
      if (e.key.toLowerCase() === "tab" && editing) {
        closeAndBlurInput();
      }

      if (
        e.key === "Enter" &&
        !e.metaKey &&
        document.activeElement === fieldRef.current
      ) {
        e.preventDefault();
        if (type !== "bool") {
          setEditing(true);
        }
      }

      if (e.key === "Escape") {
        closeAndBlurInput();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [editing, type, onChange, setEditing]);

  useEffect(() => {
    if (triggerValidation) {
      handleValidation(value);
      setTriggerValidation(false);
    }
  }, [triggerValidation, value, handleValidation, setTriggerValidation]);

  switch (type) {
    case "text":
    case "number":
    case "password":
    case "email":
    case "url":
    case "csv":
      switch (type) {
        case "password":
          displayComponent = <span>{"*".repeat(value.length)}</span>;
          break;
        case "csv":
          displayComponent = <span>{value.join(", ")}</span>;
          break;
        default:
          console.log(value, placeholder, "HERE");
          displayComponent = (
            <span>
              {value || <span className="placeholder">{placeholder}</span>}
            </span>
          );
      }
      editComponent = (
        <Input
          type={type}
          config={config}
          value={value}
          onChange={onChange}
          handleSubmit={handleSubmit}
          handleValidation={handleValidation}
          validateOnBlur={validateOnBlur}
          editing={editing}
        />
      );
      break;
    case "select":
      displayComponent = (
        <span className="content-display-select">
          {Array.isArray(value)
            ? !value.length
              ? "Select an option"
              : value
                  .join(", ")
                  .split(", ")
                  .map((selection) => (
                    <span key={selection} className="content-display-selection">
                      {selection}
                    </span>
                  ))
            : typeof options.options[0] === "object"
            ? handleSelectFormatting(options.options)
            : value}
        </span>
      );
      editComponent = (
        <Select
          value={value}
          onChange={onChange}
          setEditing={setEditing}
          handleSubmit={handleSubmit}
          handleValidation={handleValidation}
          onClose={onClose}
          options={options}
        />
      );
      break;
    case "date":
      displayComponent = <span>{value && format(value, "PP")}</span>;
      editComponent = (
        <Calendar
          value={value}
          onChange={onChange}
          handleSubmit={handleSubmit}
          setEditing={setEditing}
          handleValidation={handleValidation}
        />
      );
      break;
    case "relation":
      displayComponent = <span>{value}</span>;
      editComponent = (
        <Relation
          value={value}
          onChange={onChange}
          handleSubmit={handleSubmit}
          setEditing={setEditing}
          options={options}
          handleValidation={handleValidation}
        />
      );
      break;
    case "json":
      displayComponent = <span>{JSON.stringify(value)}</span>;
      editComponent = (
        <Json value={value} onChange={onChange} onClose={onClose} />
      );
      break;
    case "creator":
      displayComponent = <span>{value}</span>;
      editComponent = <span>{value}</span>;
      break;
  }

  return (
    <div
      className="field-container"
      ref={fieldRef}
      tabIndex={tabIndex ? "0" : "-1"}
      onFocus={(e) => {
        if (!editing) {
          e.stopPropagation();
          fieldRef.current.click();
        }
      }}
      onKeyPress={(e) => {
        if (type === "bool" && e.key === " ") {
          console.log("hitttttt");
        }
      }}
    >
      <div
        className={`field ${config.inline === true && "inline"} ${
          editing && "editing"
        } ${!label && "cell"} ${type === "bool" && "bool-it"}`}
      >
        <label className="field-label" htmlFor={label}>
          {label !== undefined && (
            <Type type={type} error={error.length}>
              {label}
            </Type>
          )}
          {required === 1 && <span className="required">*</span>}
        </label>
        <div className="content">
          {type === "bool" ? (
            <Bool
              value={value}
              onChange={onChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            editing && (
              <div className="content-edit">
                <Panel
                  isOpen={editing}
                  setIsOpen={setEditing}
                  excludeClicksOn={fieldRef.current}
                >
                  {editComponent}
                </Panel>
              </div>
            )
          )}
          {(!editing ||
            type === "select" ||
            type === "relation" ||
            type === "date") &&
            type !== "bool" && (
              <div className="content-display">{displayComponent}</div>
            )}
        </div>
        {children}
      </div>

      {(!!error.length || !!validatorContext) && !config.inline && (
        <div className="field-message-container">
          {error.length ? (
            <div className="field-error-message">{error}</div>
          ) : (
            ""
          )}
          {validatorContext ? (
            <div className="field-validator-context">{validatorContext}</div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
