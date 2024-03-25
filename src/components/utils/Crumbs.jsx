export default function Crumbs({ crumbs }) {
  const renderedCrumbs = crumbs.map((crumb, idx) => {
    return (
      <span key={`${crumb}-${idx}`}>
        <span className={idx === crumbs.length - 1 ? "crumb-end" : "crumb"}>
          {crumb}
        </span>
        {idx < crumbs.length - 1 && (
          <span className="crumb-separator"> / </span>
        )}
      </span>
    );
  });

  return <div className="rendered-path">{renderedCrumbs}</div>;
}
