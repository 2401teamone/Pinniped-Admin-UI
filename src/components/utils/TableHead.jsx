import Icon from './Icon';

export default function TableHead({ column }) {
  return (
    <th className={`th ${column.type === 'pk' ? 'pk-col' : ''}`}>
      <Icon column={column} />
      {column.name}
    </th>
  );
}
