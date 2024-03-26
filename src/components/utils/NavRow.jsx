const ICONS = {
  auth: "user",
  resource: "folder-closed",
};

export default function NavRow({ active, table, children, onClick }) {
  return (
    <div className={`nav-row ${active && "active-nav-row"}`} onClick={onClick}>
      <span>
        {table.name === "users" || table.name === "_admins" ? (
          <i className={`fa-light fa-${ICONS["auth"]}`} />
        ) : (
          <i className={`fa-light fa-${ICONS["resource"]}`} />
        )}
      </span>
      <span>{children}</span>
    </div>
  );
}
