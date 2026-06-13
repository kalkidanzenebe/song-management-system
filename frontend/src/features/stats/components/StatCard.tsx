import styled from '@emotion/styled';
import { theme } from '../../../shared/styles/theme';
import { Card } from '../../../shared/components/Card';

interface StatCardProps {
  title: string;
  value: number;
  color?: string;
}

const StyledCard = styled(Card)<{ color?: string }>`
  border-left: 4px solid ${({ color }) => color || theme.colors.primary};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardTitle = styled.p`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  margin: 0 0 ${theme.spacing[8]} 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CardValue = styled.p`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: 2rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin: 0;
`;

export const StatCard = ({ title, value, color }: StatCardProps) => (
  <StyledCard color={color}>
    <CardTitle>{title}</CardTitle>
    <CardValue>{value}</CardValue>
  </StyledCard>
);
