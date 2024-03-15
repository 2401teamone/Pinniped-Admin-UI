import { useState, useEffect } from 'react';

import Field from '../forms/fields/Field.jsx';
import PK from './PK.jsx';

import { updateOne } from '../../api/crud.js';

export default function TableCell({ table, column, row }) {
  const [value, setValue] = useState(null);

  const handleUpdate = async (updatedVal) => {
    console.log('update', updatedVal);
    const res = await updateOne(table.id, row.id, {
      [column.name]: updatedVal,
    });
    console.log(res.data.row);
  };

  useEffect(() => {
    setValue(row[column.name]);
  }, [column.name, row]);

  return (
    <div className="td size">
      {value === null ? (
        ''
      ) : column.type === 'pk' ? (
        <PK id={row.id} />
      ) : (
        <Field
          type={column.type}
          value={value}
          onChange={(val) => setValue(val)}
          handleSubmit={handleUpdate}
          onClose={handleUpdate}
          config={{
            inline: true,
            options: column.type === 'select' ? column.options.options : [],
          }}
        />
      )}
    </div>
  );
}
