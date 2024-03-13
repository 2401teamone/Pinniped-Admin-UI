import { useEffect } from 'react';

import axios from 'axios';

import TH from './TableHead';
import TableRow from './TableRow';

// add search

export default function Table({ table, rows, setRows }) {
  useEffect(() => {
    async function getRows() {
      const { data } = await axios.get(
        `http://localhost:3000/api/tables/${table.id}/rows`
      );
      setRows(data.rows);
    }
    if (table) {
      getRows();
    }
  }, [table, setRows]);

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="table">
          <div className="thead">
            <TH column={{ type: 'pk', name: 'id' }}></TH>
            {table &&
              table.columns.map((column) => (
                <TH key={column.name} column={column} />
              ))}
            <TH column={{ type: 'date', name: 'created_at' }} />
            <TH column={{ type: 'date', name: 'updated_at' }} />
          </div>
          <div className="tbody">
            {rows &&
              rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    table={table}
                    row={row}
                    setRows={setRows}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="table-footer">Total Found: {rows.length}</div>
    </div>
  );
}
