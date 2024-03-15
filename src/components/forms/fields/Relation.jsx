import { useEffect, useState } from 'react';

import { getAll } from '../../../api/crud';

export default function Relation({ value, onChange, tableId }) {
  const [rows, setRows] = useState([]);
  console.log();
  useEffect(() => {
    getAll(tableId).then((res) => {
      console.log(res.data);
      setRows(res.data.rows);
    });
  }, [tableId]);

  return (
    <div className="field-relation">
      {rows.length &&
        rows.map((row) => {
          return (
            <div
              key={row.id}
              className={`field-relation-option ${
                value === row.id ? 'active' : ''
              }`}
              onClick={() => {
                onChange(row.id);
              }}
            >
              {row.id}
            </div>
          );
        })}
    </div>
  );
}
