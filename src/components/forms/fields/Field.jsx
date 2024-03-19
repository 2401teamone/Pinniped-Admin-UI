import { useState, useEffect, useCallback, useRef } from 'react';

import { format } from 'date-fns';

import Type from '../../utils/Type';

import Input from './Input';
import Select from './Select';
import Bool from './Bool';
import Calendar from './Calendar';
import Relation from './Relation';
import Json from './Json';

import Panel from '../../utils/Panel';

export default function Field({
  label,
  type,
  value,
  onChange,
  handleSubmit,
  onClose,
  validator,
  triggerValidation,
  setTriggerValidation,
  validateOnBlur = true,
  config = {
    required: false,
    inline: false,
    preventSpaces: false,
  },
  options,
  children,
  indexes = [],
  currentIdx = 0,
  setCurrentIdx = null,
}) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const fieldRef = useRef();

  let displayComponent = null;
  let editComponent = null;

  const handleValidation = useCallback(
    (val) => {
      if (validator) {
        const errorMessage = validator(val);
        if (errorMessage) {
          setError(errorMessage);
          return false;
        }
      }
      setError('');
      return true;
    },
    [validator]
  );

  useEffect(() => {
    if (triggerValidation) {
      console.log('validating due to external action');
      handleValidation(value);
      setTriggerValidation(false);
    }
  }, [triggerValidation, value, handleValidation, setTriggerValidation]);

  useEffect(() => {
    const fieldRefHold = fieldRef.current;

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        setCurrentIdx((currentIdx + 1) % indexes.length);
      }
    };

    if (fieldRefHold) {
      fieldRefHold.addEventListener('keydown', handleTab);
    }

    console.log(indexes, currentIdx, 'ooplah');

    if (currentIdx === indexes.indexOf(label)) {
      console.log('focusing on ', label);
      // fieldRefHold && fieldRefHold.click();
    }

    return () => {
      if (fieldRefHold) {
        fieldRefHold.removeEventListener('keydown', handleTab);
      }
    };
  }, [currentIdx, indexes, setCurrentIdx, label]);

  switch (type) {
    case 'text':
    case 'number':
    case 'password':
    case 'email':
    case 'url':
    case 'csv':
      switch (type) {
        case 'password':
          displayComponent = <span>{'*'.repeat(value.length)}</span>;
          break;
        case 'csv':
          displayComponent = <span>{value.join(', ')}</span>;
          break;
        default:
          displayComponent = <span>{value}</span>;
      }
      editComponent = (
        <Input
          type={type}
          config={config}
          value={value}
          onChange={onChange}
          handleSubmit={handleSubmit}
          handleValidation={handleValidation}
          validateOnBlur={validateOnBlur}
        />
      );
      break;
    case 'select':
      displayComponent = (
        <span className="content-display-select">
          {Array.isArray(value)
            ? value
                .join(', ')
                .split(', ')
                .map((selection) => (
                  <span key={selection} className="content-display-selection">
                    {selection}
                  </span>
                ))
            : value}
        </span>
      );
      editComponent = (
        <Select
          value={value}
          onChange={onChange}
          setEditing={setEditing}
          handleSubmit={handleSubmit}
          handleValidation={handleValidation}
          onClose={onClose}
          options={options}
        />
      );
      break;
    case 'date':
      displayComponent = <span>{value && format(value, 'PP')}</span>;
      editComponent = (
        <Calendar
          value={value}
          onChange={onChange}
          handleSubmit={handleSubmit}
          setEditing={setEditing}
          handleValidation={handleValidation}
        />
      );
      break;
    case 'relation':
      displayComponent = <span>{value}</span>;
      editComponent = (
        <Relation
          value={value}
          onChange={onChange}
          setEditing={setEditing}
          options={options}
        />
      );
      break;
    case 'json':
      displayComponent = <span>{JSON.stringify(value)}</span>;
      editComponent = (
        <Json value={value} onChange={onChange} onClose={onClose} />
      );
      break;
  }

  return (
    <div
      className="field-container"
      onClick={() => type !== 'bool' && setEditing(true)}
      ref={fieldRef}
    >
      <div
        className={`field ${config.inline === true && 'inline'} ${
          editing && 'editing'
        } ${!label && 'cell'}`}
      >
        <label className="field-label" htmlFor={label}>
          {label !== undefined && (
            <Type type={type} error={error.length}>
              {label}
            </Type>
          )}
          {config.required && <span className="required">*</span>}
        </label>
        <div className="content">
          {type === 'bool' ? (
            <Bool
              value={value}
              onChange={onChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            editing && (
              <div className="content-edit">
                <Panel setIsOpen={setEditing} onClose={onClose}>
                  {editComponent}
                </Panel>
              </div>
            )
          )}
          {(!editing ||
            type === 'select' ||
            type === 'relation' ||
            type === 'date') && (
            <div className="content-display" onClick={() => setEditing(true)}>
              {displayComponent}
            </div>
          )}
        </div>
        {children}
      </div>
      {!!error.length && !config.inline && (
        <div className="field-error-message-container">
          <span className="field-error-message">{error}</span>
        </div>
      )}
    </div>
  );
}
