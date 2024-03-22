import Icon from "../utils/Icon";

export default function TH({ column }) {
  return (
    <th className={`th ${column.type === "pk" ? "pk-col" : ""}`}>
      <span className="icon">
        <Icon column={column} />
      </span>
      <span className="name">{column.name}</span>
    </th>
  );
}
