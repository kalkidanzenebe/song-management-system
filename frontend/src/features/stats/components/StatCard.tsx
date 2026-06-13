import styled from '@emotion/styled';

interface StatCardProps {
  title: string;
  value: number;
  color?: string;
}

const Card = styled.div<{ color?: string }>`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${({ color }) => color || '#3b82f6'};
`;

const CardTitle = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CardValue = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

export const StatCard = ({ title, value, color }: StatCardProps) => (
  <Card color={color}>
    <CardTitle>{title}</CardTitle>
    <CardValue>{value}</CardValue>
  </Card>
);
