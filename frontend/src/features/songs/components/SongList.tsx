import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../../app/store';
import { fetchSongsRequest } from '../redux/songSlice';
import { Loader } from '../../../shared/components/Loader';
import { SongItem } from './SongItem';
import { SongForm } from './SongForm';
import { GenreFilter } from './GenreFilter';
import { Song } from '../types/song';
import styled from '@emotion/styled';

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

export const SongList = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, selectedGenre } = useSelector(
    (state: RootState) => state.songs
  );
  const [editingSong, setEditingSong] = useState<Song | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest(selectedGenre));
  }, [dispatch, selectedGenre]);

  const uniqueGenres = Array.from(new Set(songs.map((song) => song.genre)));

  if (loading) return <Loader />;
  if (error) return <EmptyState>Error: {error}</EmptyState>;

  return (
    <div>
      <SongForm
        songToEdit={editingSong}
        onCancel={() => setEditingSong(null)}
      />
      
      {uniqueGenres.length > 0 && <GenreFilter genres={uniqueGenres} />}
      
      {songs.length === 0 ? (
        <EmptyState>No songs found. Add one above!</EmptyState>
      ) : (
        songs.map((song) => (
          <SongItem
            key={song._id}
            song={song}
            onEdit={setEditingSong}
          />
        ))
      )}
    </div>
  );
};
