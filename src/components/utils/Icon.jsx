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
      icon = <i className={`fa-light fa-${ICONS.pk}`}></i>;
      break;
    case "text":
      icon = <i className={`fa-light fa-${ICONS.text}`}></i>;
      break;
    case "number":
      icon = <i className={`fa-light fa-${ICONS.number}`}></i>;
      break;
    case "bool":
      icon = <i className={`fa-light fa-${ICONS.bool}`}></i>;
      break;
    case "date":
      icon = <i className={`fa-light fa-${ICONS.date}`}></i>;
      break;
    case "email":
      icon = <i className={`fa-light fa-${ICONS.email}`}></i>;
      break;
    case "url":
      icon = <i className={`fa-light fa-${ICONS.url}`}></i>;
      break;
    case "select":
      icon = <i className={`fa-light fa-${ICONS.select}`}></i>;
      break;
    case "relation":
      icon = <i className={`fa-light fa-${ICONS.relation}`}></i>;
      break;
    case "json":
      icon = <i className={`fa-light fa-${ICONS.json}`}></i>;
      break;
    case "creator":
      icon = <i className={`fa-light fa-${ICONS.creator}`}></i>;
      break;
    case "password":
      icon = <i className={`fa-light fa-${ICONS.password}`}></i>;
      break;
    case "username":
      icon = <i className={`fa-light fa-${ICONS.username}`}></i>;
      break;
    case "csv":
      icon = <i className={`fa-light fa-${ICONS.csv}`}></i>;
      break;
    default:
      icon = <div></div>;
  }

  return <>{icon}</>;
}
