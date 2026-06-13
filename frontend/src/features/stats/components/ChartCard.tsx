import styled from '@emotion/styled';
import { theme } from '../../../shared/styles/theme';
import { Card } from '../../../shared/components/Card';

const ChartTitle = styled.h3`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textPrimary};
  margin: 0 0 ${theme.spacing[16]} 0;
`;

const ChartContent = styled.div`
  min-height: 250px;
`;

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard = ({ title, children }: ChartCardProps) => (
  <Card>
    <ChartTitle>{title}</ChartTitle>
    <ChartContent>{children}</ChartContent>
  </Card>
);
