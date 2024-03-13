import { useState } from 'react';

export default function PK({ id }) {
  const [hovering, setHovering] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(id);
  };

  return (
    <div className="pk">
      <i
        className="fa-light fa-copy copy-btn"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={copyId}
      ></i>
      {hovering && <div className="copy-tooltip">Copy</div>}
      {id.slice(0, 10)}
    </div>
  );
}
