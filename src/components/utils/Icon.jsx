import {
  Key,
  Type,
  Hash,
  CheckSquare,
  Calendar,
  AtSign,
  Link,
  List,
  Repeat,
  Code,
  Edit2,
  Lock,
  User,
  FileText,
} from "react-feather";

export default function Icon({ column }) {
  let icon;

  switch (column.type) {
    case "pk":
      icon = <Key size={10}></Key>;
      break;
    case "text":
      icon = <Type size={10}></Type>;
      break;
    case "number":
      icon = <Hash size={10}></Hash>;
      break;
    case "bool":
      icon = <CheckSquare size={10}></CheckSquare>;
      break;
    case "date":
      icon = <Calendar size={10}></Calendar>;
      break;
    case "email":
      icon = <AtSign size={10}></AtSign>;
      break;
    case "url":
      icon = <Link size={10}></Link>;
      break;
    case "select":
      icon = <List size={10}></List>;
      break;
    case "relation":
      icon = <Repeat size={10}></Repeat>;
      break;
    case "json":
      icon = <Code size={10}></Code>;
      break;
    case "creator":
      icon = <Edit2 size={10}></Edit2>;
      break;
    case "password":
      icon = <Lock size={10}></Lock>;
      break;
    case "username":
      icon = <User size={10}></User>;
      break;
    case "csv":
      icon = <FileText size={10}></FileText>;
      break;
    default:
      icon = <div></div>;
  }

  return <>{icon}</>;
}
