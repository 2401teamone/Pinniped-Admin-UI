import styled from "styled-components";

export default function Crumbs({ crumbs }) {
  const renderedCrumbs = crumbs.map((crumb, idx) => {
    return (
      <Crumb key={`${crumb}-${idx}`}>
        <span className={idx === crumbs.length - 1 ? "crumb-end" : "crumb"}>
          {crumb}
        </span>
        {idx < crumbs.length - 1 && (
          <span className="crumb-separator"> / </span>
        )}
      </Crumb>
    );
  });

  return <CrumbsWrapper>{renderedCrumbs}</CrumbsWrapper>;
}

const CrumbsWrapper = styled.div`
  font-size: 1.8rem;
`;

const Crumb = styled.span`
  color: var(--light-gray);
  flex-grow: 1;
  flex-wrap: no-wrap;

  & .crumb-separator {
    margin: 0 8px;
    color: var(--light-gray);
  }
  & .crumb-end {
    color: var(--black);
  }
`;
