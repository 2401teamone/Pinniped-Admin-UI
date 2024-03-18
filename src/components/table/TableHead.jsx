import Icon from '../utils/Icon';

export default function TH({ column }) {
  return (
    <div className={`th size ${column.type === 'pk' ? 'pk-col' : ''}`}>
      <Icon column={column} />
      {column.name}
    </div>
  );
}
