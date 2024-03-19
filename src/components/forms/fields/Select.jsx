export default function Select({
  options,
  value,
  handleSubmit,
  onChange,
  handleValidation,
  setEditing,
}) {
  const renderedOptions = options.options.map((option) => {
    return (
      <div
        key={option}
        className={`field-select-option ${value === option ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          const selection = [option];
          console.log(selection);
          if (handleValidation && handleValidation(selection)) {
            onChange(selection);

            if (handleSubmit) handleSubmit(selection); // handle this on backend
          }
          console.log('closing');
          setEditing(false);
        }}
      >
        {option}
      </div>
    );
  });

  return <div className="field-select">{renderedOptions}</div>;
}
