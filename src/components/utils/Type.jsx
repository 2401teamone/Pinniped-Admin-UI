const ICONS = {
  pk: 'key',
  text: 'text',
  number: 'hashtag',
  bool: 'check-square',
  date: 'calendar',
  email: 'envelope',
  url: 'link',
  select: 'list',
  relation: 'arrows-repeat',
  json: 'code',
};

export default function Type({ type, error, children }) {
  let icon;

  switch (type) {
    case 'pk':
      icon = <i className={`fa-light fa-${ICONS.pk}`}></i>;
      break;
    case 'text':
      icon = <i className={`fa-light fa-${ICONS.text}`}></i>;
      break;
    case 'number':
      icon = <i className={`fa-light fa-${ICONS.number}`}></i>;
      break;
    case 'bool':
      icon = <i className={`fa-light fa-${ICONS.bool}`}></i>;
      break;
    case 'date':
      icon = <i className={`fa-light fa-${ICONS.date}`}></i>;
      break;
    case 'email':
      icon = <i className={`fa-light fa-${ICONS.email}`}></i>;
      break;
    case 'url':
      icon = <i className={`fa-light fa-${ICONS.url}`}></i>;
      break;
    case 'select':
      icon = <i className={`fa-light fa-${ICONS.select}`}></i>;
      break;
    case 'relation':
      icon = <i className={`fa-light fa-${ICONS.relation}`}></i>;
      break;
    case 'json':
      icon = <i className={`fa-light fa-${ICONS.json}`}></i>;
      break;
    default:
      icon = <div></div>;
  }

  return (
    <div className={`type ${error && 'error'}`}>
      <span className="type-icon">{icon}</span>
      <span className="type-name">{children}</span>
    </div>
  );
}
