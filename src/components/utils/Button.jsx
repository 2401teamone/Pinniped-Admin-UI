import { useRef } from "react";

export default function Button({ type, children, ...props }) {
  const buttonRef = useRef();

  return (
    <button className={`btn ${type}`} {...props} ref={buttonRef}>
      {children}
    </button>
  );
}
