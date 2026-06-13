import styled from "@emotion/styled";

interface ErrorMessageProps {
  message: string;
}

const ErrorContainer = styled.div`
  padding: 2rem;
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 0.5rem;
  color: #991b1b;
  text-align: center;
`;

const ErrorTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
`;

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <ErrorContainer>
    <ErrorTitle>⚠️ Oops, something went wrong!</ErrorTitle>
    <p>{message}</p>
  </ErrorContainer>
);
