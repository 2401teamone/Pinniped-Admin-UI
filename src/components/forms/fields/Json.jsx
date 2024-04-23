import styled from "styled-components";

export default function Json({ value, onChange }) {
  return (
    <Container className="field-json">
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0px;
  box-shadow: var(--shadow-1);
  border: 1px solid var(--light-gray);
  z-index: 10000;
  background-color: white;
  padding: 5px;
  border-radius: var(--min-radius);
`;
