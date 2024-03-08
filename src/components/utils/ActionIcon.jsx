export default function ActionIcon({ children, ...props }) {
  return (
    <button className={`action-icon`} {...props}>
      {children}
    </button>
  );
}
