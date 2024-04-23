import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function Bool({ value, onChange, handleSubmit, fieldRef }) {
  const boolRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === " " && document.activeElement === fieldRef.current) {
        boolRef.current.click();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [fieldRef]);

  return (
    <BoolContainer>
      <Toggle
        ref={boolRef}
        $active={value}
        onClick={() => {
          const frozenValue = value === 0 ? 1 : 0;
          onChange(frozenValue);
          if (handleSubmit) handleSubmit(frozenValue);
        }}
      >
        <Circle $on={value}></Circle>
      </Toggle>
    </BoolContainer>
  );
}

const BoolContainer = styled.div`
  width: inherit;
  height: inherit;
`;

const Toggle = styled.div`
  position: relative;
  border: 1px solid var(--light-gray);
  width: 35px;
  max-width: 35px;
  height: 20px;
  padding: 3px;
  border-radius: 20px;
  background-color: var(--secondary-background);

  ${({ $active }) => $active && `background-color: var(--accent1);`}
`;

const Circle = styled.div`
  position: absolute;
  width: 14px;
  height: 80%;
  border-radius: 50%;
  border: 1px solid var(--light-gray);
  background-color: white;
  padding: 5px;
  top: 2px;
  left: 3px;
  transition: left 0.2s ease;

  ${({ $on }) => $on && `left: 18px;`}
`;
