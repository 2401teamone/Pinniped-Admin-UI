import { useEffect, useState } from 'react';

import TableHead from './utils/TableHead';

import axios from 'axios';

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
    <div className="table-container">
      <table className="table">
        <thead className="thead">
          <tr className="tr tr-header">
            <TableHead column={{ type: 'pk', name: 'id' }}></TableHead>
            {table &&
              table.columns.map((column) => (
                <TableHead key={column.name} column={column} />
              ))}
            <TableHead column={{ type: 'date', name: 'created_at' }} />
            <TableHead column={{ type: 'date', name: 'updated_at' }} />
          </tr>
        </thead>
        <tbody className="tbody">
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
        </tbody>
      </table>
      <div className="table-footer">Total Found: {rows.length}</div>
    </div>
  );
}
