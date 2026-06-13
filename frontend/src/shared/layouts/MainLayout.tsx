import styled from '@emotion/styled';

const LayoutContainer = styled.div`
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
`;

const Nav = styled.nav`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#3b82f6' : '#64748b')};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: #3b82f6;
  }
`;

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: 'songs' | 'stats';
  onTabChange: (tab: 'songs' | 'stats') => void;
}

export const MainLayout = ({ children, activeTab, onTabChange }: MainLayoutProps) => (
  <LayoutContainer>
    <Header>
      <Title>Song Management</Title>
      <Nav>
        <NavLink active={activeTab === 'songs'} onClick={() => onTabChange('songs')}>
          Songs
        </NavLink>
        <NavLink active={activeTab === 'stats'} onClick={() => onTabChange('stats')}>
          Statistics
        </NavLink>
      </Nav>
    </Header>
    <main>{children}</main>
  </LayoutContainer>
);
