import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { RootState } from '../../../app/store';
import { setSelectedGenre } from '../redux/songSlice';

const FilterContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-width: 200px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

interface GenreFilterProps {
  genres: string[];
}

export const GenreFilter = ({ genres }: GenreFilterProps) => {
  const dispatch = useDispatch();
  const selectedGenre = useSelector((state: RootState) => state.songs.selectedGenre);

  return (
    <FilterContainer>
      <Label>Filter by Genre:</Label>
      <Select
        value={selectedGenre || ''}
        onChange={(e) => dispatch(setSelectedGenre(e.target.value || null))}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </Select>
    </FilterContainer>
  );
};
