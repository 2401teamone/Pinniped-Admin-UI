import { useRef } from "react";

export default function Bool({ value, onChange, handleSubmit }) {
  const boolRef = useRef(null);

  return (
    <div className="field-bool">
      <div
        ref={boolRef}
        className={`field-bool-toggle ${value ? "active" : ""}`}
        onClick={() => {
          console.log("clicking bool");
          const frozenValue = value === 0 ? 1 : 0;
          onChange(frozenValue);
          if (handleSubmit) handleSubmit(frozenValue);
        }}
      >
        <div
          className={`field-bool-toggle-circle ${value === 1 && "on"}`}
        ></div>
      </div>
    </div>
  );
}
