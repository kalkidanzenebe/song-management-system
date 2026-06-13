import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing[16]} ${theme.spacing[24]};
`;

const Title = styled.h1`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.textPrimary};
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin: ${theme.spacing[4]} 0 0 0;
`;

const Nav = styled.nav`
  margin-top: ${theme.spacing[16]};
  display: flex;
  gap: ${theme.spacing[24]};
`;

const NavLink = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  padding: ${theme.spacing[4]} 0;
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${({ active }) => (active ? theme.colors.primary : theme.colors.textSecondary)};
  cursor: pointer;
  transition: color 0.15s;
  border-bottom: 2px solid ${({ active }) => (active ? theme.colors.primary : 'transparent')};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing[24]};
`;

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: 'songs' | 'stats';
  onTabChange: (tab: 'songs' | 'stats') => void;
}

export const MainLayout = ({ children, activeTab, onTabChange }: MainLayoutProps) => (
  <LayoutContainer>
    <StickyHeader>
      <HeaderContent>
        <Title>🎵 Song Management System</Title>
        <Subtitle>Manage songs and view analytics</Subtitle>
        <Nav>
          <NavLink active={activeTab === 'songs'} onClick={() => onTabChange('songs')}>
            Songs
          </NavLink>
          <NavLink active={activeTab === 'stats'} onClick={() => onTabChange('stats')}>
            Statistics
          </NavLink>
        </Nav>
      </HeaderContent>
    </StickyHeader>
    <MainContent>{children}</MainContent>
  </LayoutContainer>
);
