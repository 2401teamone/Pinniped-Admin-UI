import { useEffect, useRef } from 'react';

import Type from './Type';

export default function Field({ type, name, ...props }) {
  const inputRef = useRef();

  return (
    <div className="field">
      <label className="field-label" htmlFor={name}>
        <Type type={type}>{name}</Type>
      </label>
      <input
        ref={inputRef}
        className="field-input"
        type="text"
        id={name}
        {...props}
      />
    </div>
  );
}
