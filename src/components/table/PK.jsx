import { useState } from "react";

import { Copy } from "react-feather";

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
      <Copy
        size={10}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={copyId}
      />

      {hovering && (
        <div className={`copy-tooltip ${copied && "copied"}`}>
          {copied ? "Copied" : "Copy"}
        </div>
      )}
      {id.slice(0, 10)}
    </div>
  );
}
