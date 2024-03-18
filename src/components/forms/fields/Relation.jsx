import { useEffect, useState } from 'react';

import api from '../../../api/api';

export default function Relation({ value, onChange, handleSubmit, tableId }) {
  const [rows, setRows] = useState([]);
  console.log();
  useEffect(() => {
    api.getAll(tableId).then((data) => {
      setRows(data.rows);
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
                if (handleSubmit) handleSubmit(row.id); // handle this on backend
              }}
            >
              {row.id}
            </div>
          );
        })}
    </div>
  );
}
