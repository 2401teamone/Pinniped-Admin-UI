import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavRow({ active, table, children, onClick }) {
  return (
    <div className={`nav-row ${active && "active-nav-row"}`} onClick={onClick}>
      <span>
        {table.name === "users" || table.name === "_admins" ? (
          <FontAwesomeIcon icon={`fa-light fa-user`} />
        ) : (
          <FontAwesomeIcon icon={`fa-light fa-folder-closed`} />
        )}
      </span>
      <span>{children}</span>
    </div>
  );
}
