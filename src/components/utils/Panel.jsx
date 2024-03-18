import { useEffect, useRef } from 'react';

export default function Panel({
  setIsOpen,
  position = 'left',
  onClose = undefined,
  children,
}) {
  const panelRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        console.log('closing panel');
        setIsOpen(false);
        // onClose && typeof onClose === 'function' && onClose();
      }
    };
    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [setIsOpen, onClose]);

  return (
    <div className={`panel ${position}`} ref={panelRef}>
      {children}
    </div>
  );
}
