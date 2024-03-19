// import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

export default function Calendar({
  value,
  onChange,
  handleSubmit,
  handleValidation,
  setEditing,
}) {
  if (!value) value = new Date();
  console.log(value, 'in cald');
  return (
    <div className="field-calendar">
      <DayPicker
        mode="single"
        selected={value}
        onSelect={(selection) => {
          console.log(selection);
          if (handleValidation && handleValidation(selection)) {
            onChange(selection);
            if (handleSubmit) handleSubmit(selection);
          }
          console.log('closing');
          setEditing(false);
        }}
      />
    </div>
  );
}
