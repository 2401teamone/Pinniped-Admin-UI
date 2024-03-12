import { useModalContext } from '../hooks/useModal';
import TableCell from './utils/TableCell';
import { deleteOne } from '../api';

export default function TableRow({ table, row, setRows }) {
  const {
    actionCreators: { editRecord },
  } = useModalContext();

  let renderedRow = table.columns.map((column) => {
    return (
      <TableCell
        key={`${column.name}-${row.name}`}
        table={table}
        column={column}
        row={row}
        setRows={setRows}
      />
    );
  });

  const handleDelete = () => {
    deleteOne(table.id, row.id).then(() => {
      setRows((prev) => prev.filter((r) => r.id !== row.id));
    });
  };

  return (
    <tr className="tr tr-row">
      <TableCell table={table} column={{ type: 'pk', name: 'id' }} row={row} />
      {renderedRow}
      <TableCell
        table={table}
        column={{ type: 'date', name: 'created_at' }}
        row={row}
      />
      <TableCell
        table={table}
        column={{ type: 'date', name: 'updated_at' }}
        row={row}
      />
      <td onClick={handleDelete}>
        <i className="fa-thin fa-trash"></i>
      </td>
    </tr>
  );
}
