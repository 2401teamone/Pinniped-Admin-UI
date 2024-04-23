import styled from "styled-components";

export default function FormFooter({ children }) {
  return <FormFooterWrapper>{children}</FormFooterWrapper>;
}

const FormFooterWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  position: fixed;
  padding: 15px 10px;
  bottom: 0;
  box-shadow: var(--shadow-1);
  width: var(--side-modal-width);
  background-color: white;
  border-top: 1px solid var(--pk);
`;
