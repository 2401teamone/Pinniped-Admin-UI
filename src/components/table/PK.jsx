import { useState } from "react";

export default function PK({ id }) {
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyId = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="pk">
      <i
        className="fa-light fa-copy copy-btn"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={copyId}
      ></i>
      {hovering && (
        <div className={`copy-tooltip ${copied && "copied"}`}>
          {copied ? "Copied" : "Copy"}
        </div>
      )}
      {id.slice(0, 10)}
    </div>
  );
}
