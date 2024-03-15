export default function Json({ value, onChange }) {
  return (
    <div className="field-json">
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
