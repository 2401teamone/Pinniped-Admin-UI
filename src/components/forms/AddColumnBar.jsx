import { useState } from 'react';

import { TYPES } from '../../constants/constants';
import Icon from '../utils/Icon.jsx';

const determineOptions = (type) => {
  switch (type) {
    case 'text':
      return { minLength: 0, maxLength: 255 };
    case 'number':
      return { min: 0, max: 1000 };
    case 'date':
      return { min: '2021-01-01', max: '2022-01-01' };
    case 'bool':
      return {};
    case 'email':
      return {};
    case 'url':
      return {};
    case 'json':
      return { maxSize: 20000 };
    case 'relation':
      return { tableId: '' };
    case 'select':
      return { maxSelect: 1, options: [] };
    default:
      throw new Error('invalid type');
  }
};

export default function AddColumnBar({ dispatch }) {
  const [showContext, setShowContext] = useState('');
  const addColumn = (type) => {
    const generateID = () => {
      return Math.random().toString(36).substring(7);
    };

    const newField = {
      tempId: generateID(),
      name: '',
      type,
      required: 0,
      options: determineOptions(type),
    };

    dispatch({ type: 'ADD_COLUMN', payload: newField });
  };

  const addColumnBar = Object.values(TYPES).map((type) => {
    return (
      <span
        key={type}
        className="add-column-btn"
        onClick={() => addColumn(type)}
        onMouseOver={() => setShowContext(type)}
        onMouseLeave={() => setShowContext('')}
      >
        <Icon column={{ type }} />
        {showContext === type && <span className="context">{type}</span>}
      </span>
    );
  });

  return <div className="add-column-bar">{addColumnBar}</div>;
}
