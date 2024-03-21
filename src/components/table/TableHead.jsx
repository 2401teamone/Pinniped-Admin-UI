import Icon from "../utils/Icon";

export default function TH({ column }) {
  return (
    <th className={`th size ${column.type === "pk" ? "pk-col" : ""}`}>
      <Icon column={column} />
      {column.name}
    </th>
  );
}
