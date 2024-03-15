const ICONS = {
  auth: 'user',
  resource: 'folder-closed',
};

export default function NavRow({ active, children, onClick }) {
  return (
    <div className={`nav-row ${active && 'active-nav-row'}`} onClick={onClick}>
      <span>
        <i className={`fa-light fa-${ICONS['resource']}`} />
      </span>
      <span>{children}</span>
    </div>
  );
}
