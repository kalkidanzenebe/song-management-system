import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import styled from '@emotion/styled';
import type { RootState } from '../../../app/store';
import {
  fetchSongsRequest,
  setSelectedGenre,
  setSearchQuery,
} from '../redux/songSlice';
import { Loader } from '../../../shared/components/Loader';
import { ErrorMessage } from '../../../shared/components/ErrorMessage';
import { EmptyState } from '../../../shared/components/EmptyState';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Select } from '../../../shared/components/Select';
import { Card } from '../../../shared/components/Card';
import { SongForm } from './SongForm';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import type { Song } from '../types/song';
import { theme } from '../../../shared/styles/theme';

const FiltersSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[16]};
  margin-bottom: ${theme.spacing[24]};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
  flex: 1;
`;

const FilterLabel = styled.label`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textPrimary};
`;

const AddButtonContainer = styled.div`
  @media (min-width: 768px) {
    align-self: flex-end;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
`;

const TableHead = styled.thead`
  background-color: ${theme.colors.gray[50]};
`;

const TableHeader = styled.th`
  text-align: left;
  padding: ${theme.spacing[12]} ${theme.spacing[16]};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.textSecondary};
  border-bottom: 1px solid ${theme.colors.border};
`;

const TableRow = styled.tr`
  &:hover {
    background-color: ${theme.colors.gray[50]};
  }
`;

const TableData = styled.td`
  padding: ${theme.spacing[12]} ${theme.spacing[16]};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textPrimary};
  border-bottom: 1px solid ${theme.colors.border};
`;

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing[8]};
`;

export const SongList = () => {
  const dispatch = useDispatch();
  const { songs, loading, error, selectedGenre, searchQuery } = useSelector(
    (state: RootState) => state.songs
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest(selectedGenre));
  }, [dispatch, selectedGenre]);

  const uniqueGenres = useMemo(
    () => Array.from(new Set(songs.map((song) => song.genre))),
    [songs]
  );

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesSearch = searchQuery
        ? song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.genre.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesGenre = selectedGenre ? song.genre === selectedGenre : true;

      return matchesSearch && matchesGenre;
    });
  }, [songs, searchQuery, selectedGenre]);

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (song: Song) => {
    if (!song._id) return;
    setSongToDelete({ id: song._id, title: song.title });
    setIsDeleteModalOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSong(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSongToDelete(null);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <FiltersSection>
        <FilterGroup>
          <FilterLabel htmlFor="search">Search</FilterLabel>
          <Input
            id="search"
            placeholder="Search songs..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </FilterGroup>
        <FilterGroup>
          <FilterLabel htmlFor="genre">Genre</FilterLabel>
          <Select
            id="genre"
            value={selectedGenre || ''}
            onChange={(e) =>
              dispatch(setSelectedGenre(e.target.value || null))
            }
          >
            <option value="">All Genres</option>
            {uniqueGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Select>
        </FilterGroup>
        <AddButtonContainer>
          <Button onClick={() => setIsFormOpen(true)}>+ Add Song</Button>
        </AddButtonContainer>
      </FiltersSection>

      {filteredSongs.length === 0 ? (
        <Card>
          <EmptyState
            title="No songs found"
            description="Add a song to get started!"
          />
        </Card>
      ) : (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>Title</TableHeader>
                  <TableHeader>Artist</TableHeader>
                  <TableHeader>Album</TableHeader>
                  <TableHeader>Genre</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </TableHead>
              <tbody>
                {filteredSongs.map((song) => (
                  <TableRow key={song._id}>
                    <TableData>{song.title}</TableData>
                    <TableData>{song.artist}</TableData>
                    <TableData>{song.album}</TableData>
                    <TableData>{song.genre}</TableData>
                    <TableData>
                      <Actions>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(song)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteClick(song)}
                        >
                          Delete
                        </Button>
                      </Actions>
                    </TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Card>
      )}

      <SongForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        songToEdit={editingSong}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        songId={songToDelete?.id || null}
        songTitle={songToDelete?.title || ''}
      />
    </div>
  );
};
