export default function Footer({ children }) {
  return (
    <footer className="footer">
      <div className="content">{children}</div>
      <div className="standard">Pinniped v0.0.1</div>
    </footer>
  );
}
