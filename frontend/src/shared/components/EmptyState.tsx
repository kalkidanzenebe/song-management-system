import styled from "@emotion/styled";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
}

const EmptyContainer = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  color: #64748b;
`;

const EmptyIcon = styled.span`
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
`;

const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  color: #475569;
  margin-bottom: 0.5rem;
`;

export const EmptyState = ({
  title = "No items found",
  description = "Add some items to get started!",
  icon = "🎵",
}: EmptyStateProps) => (
  <EmptyContainer>
    <EmptyIcon>{icon}</EmptyIcon>
    <EmptyTitle>{title}</EmptyTitle>
    <p>{description}</p>
  </EmptyContainer>
);
