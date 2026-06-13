import styled from '@emotion/styled';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

const getVariantStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'secondary':
      return 'background-color: #64748b; color: white; &:hover { background-color: #475569; }';
    case 'success':
      return 'background-color: #22c55e; color: white; &:hover { background-color: #16a34a; }';
    case 'danger':
      return 'background-color: #ef4444; color: white; &:hover { background-color: #dc2626; }';
    default:
      return 'background-color: #3b82f6; color: white; &:hover { background-color: #2563eb; }';
  }
};

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'sm':
      return 'padding: 0.25rem 0.75rem; font-size: 0.875rem;';
    case 'lg':
      return 'padding: 0.75rem 1.5rem; font-size: 1.125rem;';
    default:
      return 'padding: 0.5rem 1rem; font-size: 1rem;';
  }
};

export const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${({ disabled }) => disabled && 'opacity: 0.5; cursor: not-allowed;'}
`;
