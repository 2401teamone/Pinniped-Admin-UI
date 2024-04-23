import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

export default function Select({
  options,
  value,
  handleSubmit,
  onChange,
  handleValidation,
  setEditing,
}) {
  const [current, setCurrent] = useState(0);

  const selectOptions = options.options;

  const handleSelection = useCallback(
    (optionSelected) => {
      if (options.maxSelect === 1) {
        optionSelected = [optionSelected];

        if (handleValidation && handleValidation(optionSelected)) {
          if (value[0] === optionSelected[0]) {
            optionSelected = [];
          }
          onChange(optionSelected);
          if (handleSubmit) handleSubmit(optionSelected);
        }
        setEditing(false);
      } else {
        const currentSelections = [...value];
        if (currentSelections.includes(optionSelected)) {
          currentSelections.splice(
            currentSelections.indexOf(optionSelected),
            1
          );
        } else {
          currentSelections.push(optionSelected);
        }

        if (handleValidation) {
          if (!handleValidation(currentSelections)) {
            setEditing(false);
            setTimeout(() => {
              handleValidation([]);
            }, 1000);
          } else {
            onChange(currentSelections);

            if (handleSubmit) handleSubmit(currentSelections);
          }
        }
      }
    },
    [
      value,
      options.maxSelect,
      handleSubmit,
      onChange,
      handleValidation,
      setEditing,
    ]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown") {
        setCurrent((prev) => (prev + 1) % options.options.length);
      }
      if (e.key === "ArrowUp") {
        setCurrent(
          (prev) => (prev - 1 + options.options.length) % options.options.length
        );
      }
      if (e.key === " ") {
        let selection = options.options[current];
        if (typeof selection === "object") {
          selection = selection.val;
        }
        handleSelection(selection);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [current, handleSelection, options.options.length, setEditing, options]);

  const renderedOptions = selectOptions.map((option, idx) => {
    let val = option;
    if (typeof option === "object") {
      val = option.val;
      option = option.label;
    }

    return (
      <SelectOption
        key={option}
        $active={value.includes(option)}
        $highlight={current === idx}
        onClick={(e) => {
          e.stopPropagation();
          handleSelection(val);
        }}
      >
        {option}
      </SelectOption>
    );
  });

  return (
    <SelectContainer className="field-select">
      {renderedOptions}
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: inherit;
  top: 15px;
  box-shadow: var(--shadow-1);
  border: 1px solid var(--light-gray);
  background-color: white;
  padding: 5px;
  border-radius: var(--min-radius);
`;

const SelectOption = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: var(--min-radius);

  &:hover {
    background-color: var(--secondary-background);
  }

  ${({ $active }) =>
    $active &&
    `
    color: var(--blue);
    font-weight: 600;
  `}

  ${({ $highlight }) =>
    $highlight &&
    `
    background-color: var(--hover);
  `}
`;
