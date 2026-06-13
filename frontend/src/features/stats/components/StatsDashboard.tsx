import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import type { RootState } from '../../../app/store';
import { fetchStatsRequest } from '../redux/statsSlice';
import { Loader } from '../../../shared/components/Loader';
import { ErrorMessage } from '../../../shared/components/ErrorMessage';
import { EmptyState } from '../../../shared/components/EmptyState';
import { StatCard } from './StatCard';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ListLabel = styled.span`
  font-weight: 500;
`;

const ListValue = styled.span`
  color: #64748b;
`;

export const StatsDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.stats
  );

  useEffect(() => {
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!stats || stats.totalSongs === 0) {
    return (
      <EmptyState
        title="No stats available"
        description="Add some songs first to see statistics!"
        icon="📊"
      />
    );
  }

  return (
    <div>
      <StatsGrid>
        <StatCard
          title="Total Songs"
          value={stats.totalSongs}
          color="#3b82f6"
        />
        <StatCard
          title="Total Artists"
          value={stats.totalArtists}
          color="#22c55e"
        />
        <StatCard
          title="Total Albums"
          value={stats.totalAlbums}
          color="#f59e0b"
        />
        <StatCard
          title="Total Genres"
          value={stats.totalGenres}
          color="#ef4444"
        />
      </StatsGrid>

      <Section>
        <SectionTitle>Songs by Genre</SectionTitle>
        <List>
          {Object.entries(stats.songsPerGenre).map(([genre, count]) => (
            <ListItem key={genre}>
              <ListLabel>{genre}</ListLabel>
              <ListValue>{count} songs</ListValue>
            </ListItem>
          ))}
        </List>
      </Section>

      <Section>
        <SectionTitle>Artist Statistics</SectionTitle>
        <List>
          {Object.entries(stats.artistStats).map(
            ([artist, { songs, albums }]) => (
              <ListItem key={artist}>
                <ListLabel>{artist}</ListLabel>
                <ListValue>{songs} songs, {albums} albums</ListValue>
              </ListItem>
            )
          )}
        </List>
      </Section>

      <Section>
        <SectionTitle>Album Statistics</SectionTitle>
        <List>
          {Object.entries(stats.albumStats).map(
            ([album, { songs, artist }]) => (
              <ListItem key={album}>
                <ListLabel>{album}</ListLabel>
                <ListValue>{songs} songs by {artist}</ListValue>
              </ListItem>
            )
          )}
        </List>
      </Section>
    </div>
  );
};
