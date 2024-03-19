import { useState, useEffect, useCallback } from 'react';

export default function Select({
  options,
  value,
  handleSubmit,
  onChange,
  handleValidation,
  setEditing,
}) {
  const [current, setCurrent] = useState(0);

  const handleSelection = useCallback(
    (optionSelected) => {
      if (options.maxSelect === 1) {
        optionSelected = [optionSelected];
        if (handleValidation && handleValidation(optionSelected)) {
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
      if (e.key === 'Escape') {
        setEditing(false);
      }

      if (e.key === 'ArrowDown') {
        console.log(current, options.options.length, 'CURRENT');
        setCurrent((prev) => (prev + 1) % options.options.length);
      }
      if (e.key === 'ArrowUp') {
        console.log(current, options.options.length, 'CURRENT');
        setCurrent(
          (prev) => (prev - 1 + options.options.length) % options.options.length
        );
      }

      if (e.key === 'ArrowRight') {
        const selection = options.options[current];
        handleSelection(selection);
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [current, handleSelection, options.options.length, setEditing, options]);

  const renderedOptions = options.options.map((option, idx) => {
    return (
      <div
        key={option}
        className={`field-select-option ${
          value.includes(option) ? 'active' : ''
        } ${current === idx ? 'highlight' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          handleSelection(option);
        }}
      >
        {option}
      </div>
    );
  });

  return <div className="field-select">{renderedOptions}</div>;
}
