import Type from '../../utils/Type';

export default function Field({
  label,
  type,
  inline,
  required = false,
  children,
}) {
  return (
    <div className={`field ${inline === 'true' && 'inline'}`}>
      <label className="field-label" htmlFor={label}>
        <Type type={type}>{label}</Type>
        {required && <span className="required">*</span>}
      </label>
      {children}
    </div>
  );
}
