export default function LogView({ log }) {
  return (
    <div className="log-view">
      <h2 className="log-view-header">Request Log</h2>
      <table>
        <tbody>
          {Object.entries(log).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
