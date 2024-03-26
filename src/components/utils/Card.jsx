export default function Card({ header, children }) {
  return (
    <div className="card">
      <h3 className="card-header">{header}</h3>
      <div className="data">{children}</div>
    </div>
  );
}
