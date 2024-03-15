import { useEffect, useRef } from 'react';

export default function Input({
  type,
  config,
  value,
  onChange,
  handleValidation,
  handleSubmit,
}) {
  const inputRef = useRef();

  useEffect(() => {
    const refVar = inputRef.current;

    const handler = (e) => {
      console.log(e.key, 'KEY');
      if (e.key === ' ') {
        e.preventDefault();
        e.target.value += '_';
      }
    };

    if (config.preventSpaces) {
      refVar.addEventListener('keydown', handler);
    }

    refVar.focus();

    return () => {
      if (config.preventSpaces) {
        refVar.removeEventListener('keydown', handler);
      }
    };
  }, [config.preventSpaces]);

  return (
    <input
      ref={inputRef}
      className="field-input"
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => {
        if (handleValidation) handleValidation(e.target.value);
        return;
        if (handleSubmit) {
          console.log('submitting', e.target.value);
          handleSubmit(e.target.value);
        }
      }}
    />
  );
}
