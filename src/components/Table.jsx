import { useEffect, useState, useCallback } from 'react';

import { useSearch } from 'wouter';

import axios from 'axios';

import TableRow from './TableRow';
import Type from './utils/Type';
import Delim from './utils/Delim';

// add search

export default function Table({ table }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getRows() {
      const { data } = await axios.get(
        `http://localhost:3000/api/tables/${table.name}`
      );
      setRows(data.rows);
    }
    if (table) {
      getRows();
    }
  }, [table]);

  return (
    <div className="table">
      <div className="table-header">
        {table &&
          JSON.parse(table.columns).map((column) => (
            <div key={column.name}>
              {column.name} / {column.type}
            </div>
          ))}
      </div>
      <Type type="pk">id</Type>
      <Delim />
      <div className="table-records">
        {rows.length &&
          rows.map((row) => {
            return <TableRow key={row.size} row={row} />; // change back to row.id when fixed
          })}
      </div>
      <Delim />
    </div>
  );
}
