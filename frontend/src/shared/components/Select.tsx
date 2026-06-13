import styled from '@emotion/styled';
import { theme } from '../styles/theme';

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing[8]} ${theme.spacing[12]};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius[12]};
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textPrimary};
  background-color: ${theme.colors.surface};
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.background}, 0 0 0 4px ${theme.colors.primary};
  }
`;
