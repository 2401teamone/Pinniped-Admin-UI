import { useEffect, useState } from 'react';

import api from '../../../api/api';
import Panel from '../../utils/Panel';

export default function Relation({ value, onChange, handleSubmit, options }) {
  const [rows, setRows] = useState([]);

  const [showContext, setShowContext] = useState(undefined);

  console.log(options, 'OP{TIONS');

  useEffect(() => {
    api.getAll(options.tableId).then((data) => {
      setRows(data.rows);
    });
  }, [options.tableId]);

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
              <span
                className="row-context"
                onMouseOver={() => setShowContext(row.id)}
                onMouseOut={() => setShowContext(undefined)}
              >
                <i className="fa-sharp fa-thin fa-circle-info"></i>
                {showContext === row.id && (
                  <div className="row-context-dropdown">
                    <pre>{JSON.stringify(row, null, 2)}</pre>
                  </div>
                )}
              </span>
              <span className="row-id">{row.id}</span>
            </div>
          );
        })}
    </div>
  );
}
