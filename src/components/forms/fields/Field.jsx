import { useState } from 'react';

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
  config = {
    required: false,
    inline: false,
    preventSpaces: false,
    options: [],
    tableId: '',
  },
  children,
}) {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  let displayComponent = null;
  let editComponent = null;

  const handleValidation = (val) => {
    if (validator) {
      const errorMessage = validator(val);
      if (errorMessage) {
        setError(errorMessage);
        return false;
      }
    }
    setError('');
    return true;
  };

  switch (type) {
    case 'text':
    case 'number':
    case 'email':
    case 'url':
      displayComponent = <span>{value}</span>;
      editComponent = (
        <Input
          type={type}
          config={config}
          value={value}
          onChange={onChange}
          handleSubmit={handleSubmit}
          handleValidation={handleValidation}
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
          options={config.options}
          value={value}
          onChange={onChange}
          setEditing={setEditing}
          handleSubmit={handleSubmit}
          handleValidation={handleValidation}
          onClose={onClose}
        />
      );
      break;
    case 'date':
      displayComponent = <span>{format(value, 'PP')}</span>;
      editComponent = (
        <Calendar value={value} onChange={onChange} setEditing={setEditing} />
      );
      break;
    case 'bool':
      displayComponent = <span>{value ? 'True' : 'False'}</span>;
      editComponent = <Bool value={value} onChange={onChange} />;
      break;
    case 'relation':
      displayComponent = <span>{value}</span>;
      editComponent = (
        <Relation
          value={value}
          onChange={onChange}
          setEditing={setEditing}
          tableId={config.tableId}
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
    <div className="field-container">
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
          {editing && (
            <div className="content-edit">
              <Panel setIsOpen={setEditing} onClose={onClose}>
                {editComponent}
              </Panel>
            </div>
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
