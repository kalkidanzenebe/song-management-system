import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Song } from '../types/song';
import { createSongRequest, updateSongRequest } from '../redux/songSlice';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';

const FormContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
`;

const FormActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

interface SongFormProps {
  songToEdit?: Song | null;
  onCancel?: () => void;
}

export const SongForm = ({ songToEdit, onCancel }: SongFormProps) => {
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
      dispatch(createSongRequest(formData as Omit<Song, '_id' | 'createdAt' | 'updatedAt'>));
    }
    if (onCancel) onCancel();
    setFormData({ title: '', artist: '', album: '', genre: '' });
  };

  return (
    <FormContainer>
      <FormTitle>{songToEdit ? 'Edit Song' : 'Add New Song'}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
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
            value={formData.artist}
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
            value={formData.album}
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
            value={formData.genre}
            onChange={handleChange}
            placeholder="Enter genre"
            required
          />
        </FormGroup>
        <FormActions>
          <Button type="submit">{songToEdit ? 'Update Song' : 'Add Song'}</Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </FormActions>
      </Form>
    </FormContainer>
  );
};
