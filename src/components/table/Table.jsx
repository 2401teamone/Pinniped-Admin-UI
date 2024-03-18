import { useState, useEffect } from 'react';

import api from '../../api/api.js';

import TH from './TableHead';
import TableRow from './TableRow';
import ActionBox from '../utils/ActionBox';

// add search

export default function Table({ table, rows, setRows }) {
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    async function getRows() {
      const data = await api.getAll(table.id);
      setRows(data.rows);
    }
    if (table) {
      console.log('fetched rows');
      getRows();
    }
  }, [table, setRows]);

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="table">
          <div className="thead">
            <div className="select-row-header"></div>
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
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <ActionBox
        table={table}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setRows={setRows}
      />
    </div>
  );
}
