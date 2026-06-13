import { useState } from 'react';
import { MainLayout } from './shared/layouts/MainLayout';
import { SongList } from './features/songs/components/SongList';
import { StatsDashboard } from './features/stats/components/StatsDashboard';
import { Global } from '@emotion/react';
import { GlobalStyles } from './shared/styles/GlobalStyles';

function App() {
  const [activeTab, setActiveTab] = useState<'songs' | 'stats'>('songs');

  return (
    <>
      <Global styles={GlobalStyles} />
      <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'songs' ? <SongList /> : <StatsDashboard />}
      </MainLayout>
    </>
  );
}

export default App;
