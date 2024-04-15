// import { format } from 'date-fns';
import { DayPicker } from "react-day-picker";
import styled from "styled-components";

export default function Calendar({
  value,
  onChange,
  handleSubmit,
  handleValidation,
  setEditing,
}) {
  if (!value) value = new Date();
  return (
    <Container className="field-calendar">
      <DayPicker
        mode="single"
        selected={value}
        onSelect={(selection) => {
          if (handleValidation && handleValidation(selection)) {
            onChange(selection);
            if (handleSubmit) handleSubmit(selection);
          }
          setEditing(false);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 20px;
  box-shadow: var(--shadow-1);
  border: 1px solid var(--light-gray);
  z-index: 10000;
  background-color: white;
  padding: 5px;
  border-radius: var(--min-radius);
`;
