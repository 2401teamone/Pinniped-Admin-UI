// Dependencies
import { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { format } from "date-fns";

// Components/styling
import Input from "./Input";
import Select from "./Select";
import Bool from "./Bool";
import Calendar from "./Calendar";
import Relation from "./Relation";
import Json from "./Json";

import Type from "../../utils/Type";
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

  const handleValidation = useCallback(
    (val) => {
      if (validator) {
        const errorMessage = validator(val);
        if (errorMessage) {
          setError(errorMessage);
          return false;
        }
      }
      setError("");
      return true;
    },
    [validator]
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
    case "username":
      switch (type) {
        case "password":
          displayComponent = <span>{"*".repeat(value.length)}</span>;
          break;
        case "csv":
          displayComponent = <span>{value.join(", ")}</span>;
          break;
        default:
          displayComponent = (
            <span>{value || <Placeholder>{placeholder}</Placeholder>}</span>
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
          error={error}
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
    <FieldContainer
      className="field-container"
      ref={fieldRef}
      tabIndex={tabIndex ? "0" : "-1"}
      onFocus={(e) => {
        if (!editing) {
          e.stopPropagation();
          fieldRef.current.click();
        }
      }}
    >
      <FieldWrapper
        $editing={editing}
        $bool={type === "bool"}
        $inline={config.inline}
        className={`field ${config.inline === true && "inline"} ${
          !label && "cell"
        }`}
      >
        <label className="field-label" htmlFor={label}>
          {label !== undefined && (
            <Type type={type} error={error.length}>
              {label}
            </Type>
          )}
          {required ? <span className="required">*</span> : ""}
        </label>
        <Content className="content">
          {type === "bool" ? (
            <Bool
              value={value}
              onChange={onChange}
              handleSubmit={handleSubmit}
              fieldRef={fieldRef}
            />
          ) : (
            editing && (
              <Edit className="content-edit">
                <Panel
                  isOpen={editing}
                  setIsOpen={setEditing}
                  excludeClicksOn={fieldRef.current}
                >
                  {editComponent}
                </Panel>
              </Edit>
            )
          )}
          {(!editing ||
            type === "select" ||
            type === "relation" ||
            type === "date") &&
            type !== "bool" && (
              <Display className="content-display">{displayComponent}</Display>
            )}
        </Content>
        {children}
      </FieldWrapper>
      {(!!error.length || !!validatorContext) && !config.inline && (
        <MessageContainer className="field-message-container">
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
        </MessageContainer>
      )}
      {!config.inline && !error.length && !validatorContext && (
        <MessageContainer className="field-message-container"></MessageContainer>
      )}
    </FieldContainer>
  );
}

const FieldContainer = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:focus {
    border: none;
    outline: none;

    & .field {
      background-color: var(--editing-background);
    }
  }

  & * {
    cursor: pointer;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex-grow: 1;
  gap: 3px;
  width: inherit;
  padding: 5px;
  border: 1px solid var(--pk);
  border-radius: 2px;
  background-color: ${({ $editing }) =>
    $editing ? "var(--editing-background)" : "var(--secondary-background)"};
  transition: background-color 0.4s ease;

  & * {
    cursor: pointer;
  }

  &.cell {
    padding: 3px;
    border: none;
    background-color: inherit;
  }

  & label {
    display: flex;

    gap: 3px;
    color: var(--text-color);

    & .required {
      color: var(--red);
      font-size: 1.5rem;
    }
  }

  ${({ $bool }) =>
    $bool &&
    `
    background-color: white;
    width: max-content;
    border: none;
  `}
`;

const Placeholder = styled.span`
  color: var(--text-color);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  min-height: 22px;
  min-width: 100%;
`;

const Display = styled.div`
  position: relative;
  min-height: inherit;
  min-width: 100%;
  overflow: hidden;

  display: flex;
  align-items: center;

  & span {
    min-width: fit-content;
    white-space: nowrap;
  }

  & .content-display-select {
    display: flex;
    gap: 10px;
    & .content-display-selection {
      display: flex;
      align-items: center;
      border-radius: 4px;
      padding: 4px 8px;
      border: 1px solid var(--light-gray);
      background-color: white;
    }
  }
`;

const Edit = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  min-height: inherit;
  min-width: inherit;
  background-color: inherit;
  z-index: 10;
  padding: 5px;
`;

const MessageContainer = styled.div`
  padding: 3px 0;
  font-size: 0.9rem;
  min-height: 20px;

  & .field-validator-context {
    color: var(--text-color);
  }

  & .field-error-message {
    color: var(--error-font);
    animation: slideErrorMessage 0.3s ease;
  }
`;
