const ICONS = {
  pk: 'key',
  fk: 'arrows-repeat',
  text: 'text',
  number: 'hashtag',
  date: 'calendar',
};

export default function Type({ type, children }) {
  let icon;

  switch (type) {
    case 'pk':
      icon = <i className={`fa-light fa-${ICONS.pk}`}></i>;
      break;
    case 'fk':
      icon = <i className={`fa-light fa-${ICONS.fk}`}></i>;
      break;
    default:
      icon = <div></div>;
  }

  return (
    <div className="type">
      <span className="type-icon">{icon}</span>
      <span className="type-name">{children}</span>
    </div>
  );
}
