import React from 'react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: var(--background-light);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid var(--background-light);
  }
`;

const GenieIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const IdeaTitle = styled.h2`
  color: var(--secondary-color);
  margin: 0;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const IdeaShortDescription = styled.p`
  color: var(--text-primary);
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const InterestedButton = styled(ActionButton)`
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    background-color: #3d8b40;
  }
`;

const NextButton = styled(ActionButton)`
  background-color: var(--text-secondary);
  color: white;
  
  &:hover {
    background-color: #555;
  }
`;

const CategoryLabel = styled.div`
  position: absolute;
  top: -10px;
  right: 20px;
  background-color: var(--accent-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const IdeaPreview = ({ idea, onInterested, onNextIdea, isLoading }) => {
  // Create a shorter description for the preview
  const shortDescription = idea.description.length > 120 
    ? idea.description.substring(0, 120) + '...' 
    : idea.description;

  return (
    <PreviewContainer>
      {idea.category && <CategoryLabel>{idea.category}</CategoryLabel>}
      <GenieIcon>🧞</GenieIcon>
      <IdeaTitle>{idea.title}</IdeaTitle>
      <IdeaShortDescription>
        {shortDescription}
      </IdeaShortDescription>
      
      <ButtonsContainer>
        <InterestedButton 
          onClick={onInterested}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "I'm Interested"}
        </InterestedButton>
        
        <NextButton 
          onClick={onNextIdea}
          disabled={isLoading}
        >
          Next Idea
        </NextButton>
      </ButtonsContainer>
    </PreviewContainer>
  );
};

export default IdeaPreview;