import styled from "styled-components";

export default function LogView({ log }) {
  const formatVal = (key, val) => {
    switch (key) {
      case "timestamp":
        return new Date(val).toLocaleString();
      case "headers":
        return <pre>{JSON.stringify(val, null, 2)}</pre>;
      default:
        return val;
    }
  };
  return (
    <Container className="log-view">
      <h2 className="log-view-header">Request Log</h2>
      <table>
        <tbody>
          {Object.entries(log)
            .filter(([key]) => key !== "time")
            .map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td className={`${key === "headers" ? "headers" : ""}`}>
                  {formatVal(key, value)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}

const Container = styled.div`
  padding: 30px;
  & .log-view-header {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 300px;
    line-height: 1.5;
  }

  & table {
    width: 100%;
    & tr {
      border: 1px solid var(--light-gray);
      padding: 10px 0;

      & td {
        padding: 10px;
        &:first-child {
          font-weight: 600;
          color: var(--text-color);
        }

        &.headers {
          line-height: 1.3;
        }
      }
    }
  }
`;
