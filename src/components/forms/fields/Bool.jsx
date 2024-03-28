import { useEffect, useRef } from "react";

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
    <div className="field-bool">
      <div
        ref={boolRef}
        className={`field-bool-toggle ${value ? "active" : ""}`}
        onClick={() => {
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
