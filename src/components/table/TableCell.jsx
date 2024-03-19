import { useState, useEffect } from 'react';

import Field from '../forms/fields/Field.jsx';
import PK from './PK.jsx';

import api from '../../api/api.js';

import { format } from 'date-fns';

export default function TableCell({ table, column, row }) {
  const [value, setValue] = useState(null);

  const handleUpdate = async (updatedVal) => {
    console.log('update', updatedVal);
    const data = await api.updateOne(table.id, row.id, {
      [column.name]: updatedVal,
    });
    console.log(data.row);
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
          config={{
            inline: true,
          }}
          options={column.options}
        />
      );
  }

  return <div className="td size">{value === null ? '' : component}</div>;
}
