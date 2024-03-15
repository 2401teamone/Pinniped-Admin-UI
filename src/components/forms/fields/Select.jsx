export default function Select({
  options,
  value,
  handleSubmit,
  onChange,
  handleValidation,
  setEditing,
}) {
  const renderedOptions = options.map((option) => {
    return (
      <div
        key={option}
        className={`field-select-option ${value === option ? 'active' : ''}`}
        onClick={() => {
          const selection = [option];
          if (handleValidation && handleValidation(selection)) {
            onChange(selection);

            if (handleSubmit) handleSubmit(JSON.stringify(selection)); // handle this on backend
          }
          setEditing(false);
        }}
      >
        {option}
      </div>
    );
  });

  return <div className="field-select">{renderedOptions}</div>;
}
