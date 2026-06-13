import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import type { Song } from '../types/song';
import { deleteSongRequest } from '../redux/songSlice';
import { Button } from '../../../shared/components/Button';

const SongCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const SongInfo = styled.div`
  flex: 1;
`;

const SongTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const SongDetails = styled.p`
  color: #64748b;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
`;

const GenreBadge = styled.span`
  display: inline-block;
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface SongItemProps {
  song: Song;
  onEdit: (song: Song) => void;
}

export const SongItem = ({ song, onEdit }: SongItemProps) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (song._id) {
      dispatch(deleteSongRequest(song._id));
    }
  };

  return (
    <SongCard>
      <SongInfo>
        <SongTitle>{song.title}</SongTitle>
        <SongDetails><strong>Artist:</strong> {song.artist}</SongDetails>
        <SongDetails><strong>Album:</strong> {song.album}</SongDetails>
        <GenreBadge>{song.genre}</GenreBadge>
      </SongInfo>
      <Actions>
        <Button variant="secondary" size="sm" onClick={() => onEdit(song)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </Actions>
    </SongCard>
  );
};
