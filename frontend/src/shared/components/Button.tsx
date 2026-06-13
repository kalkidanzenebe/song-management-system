import styled from '@emotion/styled';
import { theme } from '../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

const getVariantStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'secondary':
      return `
        background-color: ${theme.colors.gray[100]};
        color: ${theme.colors.textPrimary};
        &:hover { background-color: ${theme.colors.gray[200]}; }
      `;
    case 'success':
      return `
        background-color: ${theme.colors.success};
        color: white;
        &:hover { background-color: #16a34a; }
      `;
    case 'danger':
      return `
        background-color: ${theme.colors.danger};
        color: white;
        &:hover { background-color: #dc2626; }
      `;
    default:
      return `
        background-color: ${theme.colors.primary};
        color: white;
        &:hover { background-color: #1d4ed8; }
      `;
  }
};

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return `
        padding: ${theme.spacing[8]} ${theme.spacing[16]};
        font-size: ${theme.typography.fontSize.sm};
      `;
    case 'lg':
      return `
        padding: ${theme.spacing[12]} ${theme.spacing[24]};
        font-size: ${theme.typography.fontSize.lg};
      `;
    default:
      return `
        padding: ${theme.spacing[8]} ${theme.spacing[16]};
        font-size: ${theme.typography.fontSize.base};
      `;
  }
};

export const Button = styled.button<ButtonProps>`
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius[12]};
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${theme.colors.background}, 0 0 0 4px ${theme.colors.primary};
  }

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${({ disabled }) => disabled && `
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  `}
`;
