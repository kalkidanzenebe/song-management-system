import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Song } from '../types/song';
import { createSongRequest, updateSongRequest } from '../redux/songSlice';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Modal } from '../../../shared/components/Modal';
import { theme } from '../../../shared/styles/theme';

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${theme.spacing[16]};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  &:first-of-type {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing[8]};
`;

const FormActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing[12]};
  margin-top: ${theme.spacing[8]};
`;

interface SongFormProps {
  isOpen: boolean;
  onClose: () => void;
  songToEdit?: Song | null;
}

export const SongForm = ({ isOpen, onClose, songToEdit }: SongFormProps) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<Song>>({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });

  useEffect(() => {
    if (songToEdit) {
      setFormData(songToEdit);
    } else {
      setFormData({ title: '', artist: '', album: '', genre: '' });
    }
  }, [songToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (songToEdit && songToEdit._id) {
      dispatch(
        updateSongRequest({
          id: songToEdit._id,
          data: formData as Partial<Song>,
        })
      );
    } else {
      dispatch(
        createSongRequest(
          formData as Omit<Song, '_id' | 'createdAt' | 'updatedAt'>
        )
      );
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={songToEdit ? 'Edit Song' : 'Add New Song'}
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Enter song title"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="artist">Artist</Label>
          <Input
            id="artist"
            name="artist"
            value={formData.artist || ''}
            onChange={handleChange}
            placeholder="Enter artist name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="album">Album</Label>
          <Input
            id="album"
            name="album"
            value={formData.album || ''}
            onChange={handleChange}
            placeholder="Enter album name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            name="genre"
            value={formData.genre || ''}
            onChange={handleChange}
            placeholder="Enter genre"
            required
          />
        </FormGroup>
        <FormActions>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {songToEdit ? 'Update Song' : 'Add Song'}
          </Button>
        </FormActions>
      </Form>
    </Modal>
  );
};
