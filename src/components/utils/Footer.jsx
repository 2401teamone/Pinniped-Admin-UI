export default function Footer({ overlapping, children }) {
  return (
    <footer className={`footer ${overlapping && "overlapping"}`}>
      <div className="content">{children}</div>
      <div className="standard">Pinniped v0.0.1</div>
    </footer>
  );
}
