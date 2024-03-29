import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ICONS = {
  pk: "key",
  text: "text",
  number: "hashtag",
  bool: "check-square",
  date: "calendar",
  email: "envelope",
  url: "link",
  select: "list",
  relation: "arrows-repeat",
  json: "code",
  creator: "signature",
  password: "lock",
  username: "user",
  csv: "file-csv",
};

export default function Icon({ column }) {
  let icon;

  switch (column.type) {
    case "pk":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.pk} />;
      break;
    case "text":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.text} />;
      break;
    case "number":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.number} />;
      break;
    case "bool":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.bool} />;
      break;
    case "date":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.date} />;
      break;
    case "email":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.email} />;
      break;
    case "url":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.url} />;
      break;
    case "select":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.select} />;
      break;
    case "relation":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.relation} />;
      break;
    case "json":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.json} />;
      break;
    case "creator":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.creator} />;
      break;
    case "password":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.password} />;
      break;
    case "username":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.username} />;
      break;
    case "csv":
      icon = <FontAwesomeIcon icon={"fa-light fa-" + ICONS.csv} />;
      break;
    default:
      icon = <div></div>;
  }

  return <>{icon}</>;
}
