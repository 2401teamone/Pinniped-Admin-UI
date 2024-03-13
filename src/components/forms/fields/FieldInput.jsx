import { useEffect, useRef } from 'react';
import Field from './Field';

export default function InputField({
  label,
  type,
  required,
  inline,
  preventSpaces = false,
  ...props
}) {
  const inputRef = useRef();

  console.log(preventSpaces, 'HERE');

  useEffect(() => {
    const refVar = inputRef.current;
    const handler = (e) => {
      console.log(e.key, 'KEY');
      if (e.key === ' ') {
        e.preventDefault();
        e.target.value += '_';
      }
    };
    if (preventSpaces) {
      refVar.addEventListener('keydown', handler);
    }
    return () => {
      if (preventSpaces) {
        refVar.removeEventListener('keydown', handler);
      }
    };
  }, [preventSpaces]);

  console.log(inline, 'HERE');
  return (
    <Field label={label} type={type} required={required} inline={inline}>
      <input
        ref={inputRef}
        className="field-input"
        type={type}
        id={label}
        {...props}
      />
    </Field>
  );
}
