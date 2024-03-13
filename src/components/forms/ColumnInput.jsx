export default function ColumnInput({ column, dispatch }) {
  const updateColumn = (field, value) => {
    dispatch({
      type: 'EDIT_COLUMN',
      payload: { ...column, [field]: value },
    });
  };

  const removeColumn = () => {
    dispatch({ type: 'REMOVE_COLUMN', payload: column.tempId });
  };

  return (
    <div className="column-input">
      <div className="column-icon">{column.type}</div>
      <input
        type="text"
        value={column.name}
        onChange={(e) => updateColumn('name', e.target.value)}
      />
      <button onClick={removeColumn}>Remove</button>
    </div>
  );
}
