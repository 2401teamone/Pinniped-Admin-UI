export default function Select({
  value,
  setValue,
  options,
  handleUpdate,
  setEditing,
}) {
  const renderedOptions = options.map((option) => {
    return (
      <div
        key={option}
        className={`select-option ${value === option ? 'active' : ''}`}
        onClick={() => {
          setValue(option);
          handleUpdate();
          setEditing(false);
        }}
      >
        {option}
      </div>
    );
  });

  return (
    <div className="select">
      <div className="chosen-option">{value}</div>
      {renderedOptions}
    </div>
  );
}
