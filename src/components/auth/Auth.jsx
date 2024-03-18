import pinniped from '../../assets/images/pinniped.png';

export default function Auth({ children }) {
  return (
    <div className="auth">
      <img src={pinniped} width="130px" height="80px" />
      {children}
    </div>
  );
}
