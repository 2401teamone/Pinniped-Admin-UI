export default function Text({ children }) {
  return (
    <div className="text">
      {children.length ? children : <span>{'N/A'}</span>}
    </div>
  );
}
