import { createOne } from '../../api';
import useForm from '../../hooks/useForm';

export default function AddRowForm({ table, setRows, closeModal }) {
  const { values, register, handleSubmit } = useForm();

  return (
    <form className="add-row-form">
      {table.columns.map((column) => {
        return (
          <div key={column.name}>
            <label>{column.name}</label>
            <input type="text" {...register(column.name)} />
          </div>
        );
      })}
      <button
        onClick={handleSubmit(() => {
          console.log('adding', values);
          createOne(table.id, values).then((res) => {
            console.log(res.data, 'RES');
            setRows((prev) => [...prev, res.data.row]);
            closeModal();
          });
        })}
      >
        Add Row
      </button>
    </form>
  );
}
