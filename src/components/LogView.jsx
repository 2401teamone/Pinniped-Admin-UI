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
    <div className="log-view">
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
    </div>
  );
}
