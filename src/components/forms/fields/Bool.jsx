export default function Bool({ value, onChange }) {
  return (
    <div className="field-bool">
      <div
        className={`field-bool-option ${value ? 'active' : ''}`}
        onClick={() => onChange(!value)}
      >
        {value ? 'Yes' : 'No'}
      </div>
    </div>
  );
}
