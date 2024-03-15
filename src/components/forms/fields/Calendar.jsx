// import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

export default function Calendar({ value, onChange }) {
  return (
    <div className="field-calendar">
      <DayPicker mode="single" selected={value} onSelect={onChange} />
    </div>
  );
}
