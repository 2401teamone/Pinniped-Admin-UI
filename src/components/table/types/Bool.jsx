export default function Bool({ children }) {
  return (
    <div className="bool">
      {children ? children === true ? 'True' : 'False' : <span>{'N/A'}</span>}
    </div>
  );
}
