import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { type RootState } from '../../../app/store';
import { fetchStatsRequest } from '../redux/statsSlice';
import { Loader } from '../../../shared/components/Loader';
import { ErrorMessage } from '../../../shared/components/ErrorMessage';
import { EmptyState } from '../../../shared/components/EmptyState';
import { StatCard } from './StatCard';
import { ChartCard } from './ChartCard';
import { theme } from '../../../shared/styles/theme';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${theme.spacing[16]};
  margin-bottom: ${theme.spacing[24]};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${theme.spacing[24]};

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const COLORS = [
  theme.colors.primary,
  theme.colors.success,
  theme.colors.danger,
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
];

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
        title="No Stats Available"
        description="Add your first song to get started."
        icon="📊"
      />
    );
  }

  const songsPerGenreData = Object.entries(stats.songsPerGenre).map(
    ([genre, count]) => ({ name: genre, value: count })
  );

  const artistStatsData = Object.entries(stats.artistStats).map(
    ([artist, { songs }]) => ({ name: artist, value: songs })
  );

  const albumStatsData = Object.entries(stats.albumStats).map(
    ([album, { songs }]) => ({
      name: album.length > 20 ? album.slice(0, 17) + '...' : album,
      value: songs,
    })
  );

  return (
    <div>
      <StatsGrid>
        <StatCard
          title="Total Songs"
          value={stats.totalSongs}
          color={theme.colors.primary}
        />
        <StatCard
          title="Total Artists"
          value={stats.totalArtists}
          color={theme.colors.success}
        />
        <StatCard
          title="Total Albums"
          value={stats.totalAlbums}
          color="#F59E0B"
        />
        <StatCard
          title="Total Genres"
          value={stats.totalGenres}
          color={theme.colors.danger}
        />
      </StatsGrid>

      <ChartsGrid>
        <ChartCard title="Songs per Genre">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={songsPerGenreData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.colors.border}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke={theme.colors.textSecondary}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke={theme.colors.textSecondary}
                tick={{ fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius[12],
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {songsPerGenreData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Songs per Artist">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={artistStatsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.colors.border}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke={theme.colors.textSecondary}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke={theme.colors.textSecondary}
                tick={{ fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius[12],
                }}
              />
              <Bar
                dataKey="value"
                fill={theme.colors.primary}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Songs per Album">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={albumStatsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.colors.border}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke={theme.colors.textSecondary}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke={theme.colors.textSecondary}
                tick={{ fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius[12],
                }}
              />
              <Bar
                dataKey="value"
                fill={theme.colors.success}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>
    </div>
  );
};
