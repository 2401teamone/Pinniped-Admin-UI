import Icon from "./Icon";

export default function Type({ type, error, children }) {
  return (
    <div className={`type ${error && "error"}`}>
      <Icon column={{ type: type }} />
      <span className="type-name">{children}</span>
    </div>
  );
}
