import { useState, useEffect } from 'react';

import Field from '../forms/fields/Field.jsx';
import PK from './PK.jsx';

import { updateOne } from '../../api/crud.js';

import { format } from 'date-fns';

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

  let component;
  switch (column.type) {
    case 'pk':
      component = <PK id={row.id} />;
      break;
    case 'created_at':
    case 'updated_at':
      component = <span>{value && format(value, 'PP')}</span>;
      break;
    default:
      component = (
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
      );
  }

  return <div className="td size">{value === null ? '' : component}</div>;
}
