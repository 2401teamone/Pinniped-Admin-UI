import styled from "styled-components";

import pinniped from "../../assets/images/pinniped.png";

export default function Auth({ children }) {
  return (
    <AuthContainer>
      <Logo src={pinniped} />
      <AuthForm>{children}</AuthForm>
    </AuthContainer>
  );
}

const AuthContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;

const Logo = styled.img`
  width: max(200px, 20%);
  height: auto;
  margin-bottom: 50px;
`;

const AuthForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  width: 350px;

  p {
    font-size: 1.7rem;
    text-align: center;
    color: var(--text-color);
  }
`;
