import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Modal } from '../../../shared/components/Modal';
import { Button } from '../../../shared/components/Button';
import { deleteSongRequest } from '../redux/songSlice';
import { theme } from '../../../shared/styles/theme';

const ModalContent = styled.div`
  text-align: center;
`;

const Icon = styled.span`
  font-size: 3rem;
  display: block;
  margin-bottom: ${theme.spacing[16]};
`;

const Message = styled.p`
  font-family: ${theme.typography.fontFamily.sans.join(', ')};
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing[24]};
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing[12]};
`;

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  songId: string | null;
  songTitle: string;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  songId,
  songTitle,
}: DeleteConfirmationModalProps) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (songId) {
      dispatch(deleteSongRequest(songId));
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Song">
      <ModalContent>
        <Icon>⚠️</Icon>
        <Message>
          Are you sure you want to delete "{songTitle}"? This action cannot be
          undone.
        </Message>
        <Actions>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Actions>
      </ModalContent>
    </Modal>
  );
};
