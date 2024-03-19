import { useState } from 'react';

import DeleteBtn from '../utils/Delete';
import Icon from '../utils/Icon';
import ActionIcon from '../utils/ActionIcon';
import ColumnOptions from './ColumnOptions';

export default function ColumnInput({ column, dispatch }) {
  const [showOptions, setShowOptions] = useState(false);

  const updateColumn = (field, value) => {
    dispatch({
      type: 'EDIT_COLUMN',
      payload: { ...column, [field]: value },
    });
  };

  const removeColumn = () => {
    dispatch({ type: 'REMOVE_COLUMN', payload: column.tempId });
  };

  const columnOptions = null;

  switch (column.type) {
    case 'text':
      // columnOptions = (

      // );
      break;
  }

  return (
    <div className={`column-container ${showOptions && 'show-border'}`}>
      <div className="column-input-container">
        <div className="column-input">
          <Icon column={column} />
          <input
            type="text"
            value={column.name}
            onChange={(e) => updateColumn('name', e.target.value)}
          />
        </div>
        <ActionIcon onClick={() => setShowOptions((prev) => !prev)}>
          <i className="fa-sharp fa-regular fa-gear"></i>
        </ActionIcon>
        <DeleteBtn action={removeColumn} />
      </div>
      {showOptions && (
        <ColumnOptions column={column} dispatch={dispatch}></ColumnOptions>
      )}
    </div>
  );
}
