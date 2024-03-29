import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <FontAwesomeIcon
        icon="fa-light fa-copy copy-btn"
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
