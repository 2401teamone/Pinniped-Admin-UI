export default function ActionIcon({ children, ...props }) {
  return (
    <div className={`action-icon`} {...props}>
      {children}
    </div>
  );
}
