import TableCell from './TableCell';
import Checkbox from '../utils/Checkbox.jsx';

export default function TableRow({
  table,
  row,
  setRows,
  selectedRow,
  setSelectedRow,
}) {
  return (
    table && (
      <div className="tr">
        <div className="select-row">
          <Checkbox
            checked={selectedRow === row.id}
            onChange={() => {
              setSelectedRow((prev) => {
                if (prev === row.id) return null;
                return row.id;
              });
            }}
          />
        </div>
        <TableCell
          table={table}
          column={{ type: 'pk', name: 'id' }}
          row={row}
        />
        {table.columns.map((column) => {
          return (
            <TableCell
              key={`${column.name}-${row.id}`}
              table={table}
              column={column}
              row={row}
              setRows={setRows}
            />
          );
        })}
        <TableCell
          table={table}
          column={{ type: 'created_at', name: 'created_at' }}
          row={row}
        />
        <TableCell
          table={table}
          column={{ type: 'updated_at', name: 'updated_at' }}
          row={row}
        />
      </div>
    )
  );
}
