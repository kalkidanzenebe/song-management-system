import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../../app/store';
import { fetchSongsRequest } from '../redux/songSlice';
import { Loader } from '../../../shared/components/Loader';
import { ErrorMessage } from '../../../shared/components/ErrorMessage';
import { EmptyState } from '../../../shared/components/EmptyState';
import { SongItem } from './SongItem';
import { SongForm } from './SongForm';
import { GenreFilter } from './GenreFilter';
import type { Song } from '../types/song';

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
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <SongForm
        songToEdit={editingSong}
        onCancel={() => setEditingSong(null)}
      />
      
      {uniqueGenres.length > 0 && <GenreFilter genres={uniqueGenres} />}
      
      {songs.length === 0 ? (
        <EmptyState
          title="No songs found"
          description="Add a song above to get started!"
        />
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
