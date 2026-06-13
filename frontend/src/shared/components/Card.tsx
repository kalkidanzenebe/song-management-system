import styled from '@emotion/styled';
import { theme } from '../styles/theme';

interface CardProps {
  padding?: keyof typeof theme.spacing;
}

export const Card = styled.div<CardProps>`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius[16]};
  box-shadow: ${theme.shadows.md};
  padding: ${({ padding }) => theme.spacing[padding || 24]};
`;
