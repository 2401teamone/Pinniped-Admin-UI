export default function Bool({ value, onChange, handleSubmit }) {
  return (
    <div className="field-bool">
      <div
        className={`field-bool-checkbox ${value ? 'active' : ''}`}
        onClick={() => {
          const frozenValue = value === 0 ? 1 : 0;
          onChange(frozenValue);
          if (handleSubmit) handleSubmit(frozenValue);
        }}
      >
        {value === 1 ? (
          <span>
            <i className="fa-regular fa-check"></i>
          </span>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
