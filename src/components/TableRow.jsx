import { useModalContext } from '../hooks/useModal';

export default function TableRow({ row }) {
  const {
    actionCreators: { editRecord },
  } = useModalContext();

  return (
    <div className="table-row" onClick={() => editRecord(row)}>
      {JSON.stringify(row)}
    </div>
  );
}
