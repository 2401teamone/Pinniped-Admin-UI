import FieldInput from './fields/FieldInput.jsx';

export default function ColumnOptions({ column, dispatch }) {
  const handleArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else return value;
  };

  const saveOptionAsCorrectType = (initialVal, targetVal) => {
    if (typeof initialVal === 'number') return Number(targetVal);
    if (Array.isArray(initialVal))
      return targetVal.split(',').map((val) => val.trim());
    return targetVal;
  };
  return (
    <div className="column-options">
      {Object.entries(column.options).map(([option, value]) => (
        <FieldInput
          key={option}
          label={option}
          value={value === 0 ? 0 : handleArrayValue(value)}
          type={typeof value === 'number' ? 'number' : 'text'}
          onChange={(e) =>
            dispatch({
              type: 'EDIT_COLUMN',
              payload: {
                ...column,
                options: {
                  ...column.options,
                  [option]: saveOptionAsCorrectType(value, e.target.value),
                },
              },
            })
          }
          inline="true"
        />
      ))}
    </div>
  );
}
