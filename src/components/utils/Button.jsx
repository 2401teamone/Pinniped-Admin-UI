export default function Button({ type, children, ...props }) {
  return (
    <button className={`btn ${type}`} {...props}>
      {children}
    </button>
  );
}
