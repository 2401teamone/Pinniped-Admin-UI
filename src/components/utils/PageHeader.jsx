import styled from "styled-components";

export default function PageHeader({ children }) {
  return <PageHeaderWrapper>{children}</PageHeaderWrapper>;
}

const PageHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 20px 40px;
`;
