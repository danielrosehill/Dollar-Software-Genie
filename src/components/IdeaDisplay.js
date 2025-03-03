import React from 'react';
import styled from 'styled-components';

const IdeaContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: var(--background-light);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
`;

const IdeaHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const GenieIcon = styled.div`
  font-size: 3rem;
  margin-right: 1rem;
`;

const IdeaTitle = styled.h2`
  color: var(--secondary-color);
  margin: 0;
  font-size: 1.8rem;
`;

const IdeaDescription = styled.div`
  color: var(--text-primary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  white-space: pre-wrap;
`;

const FeaturesList = styled.ul`
  margin-bottom: 2rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
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
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const GenerateCodeButton = styled(ActionButton)`
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    background-color: #3d8b40;
  }
`;

const BackButton = styled(ActionButton)`
  background-color: transparent;
  border: 2px solid var(--text-secondary);
  color: var(--text-secondary);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const PromptButton = styled(ActionButton)`
  background-color: var(--accent-color);
  color: white;
  
  &:hover {
    background-color: #6a3dd0;
  }
`;

const PromptContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--background-dark);
  border-radius: 8px;
  border-left: 4px solid var(--accent-color);
`;

const PromptHeader = styled.h3`
  color: var(--accent-color);
  margin-top: 0;
`;

const PromptText = styled.pre`
  white-space: pre-wrap;
  color: var(--text-primary);
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
`;

const PromptDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const CopyButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const IdeaDisplay = ({ idea, onGenerateCode, onBackToSlot, isLoading }) => {
  const [showPrompt, setShowPrompt] = React.useState(false);
  
  const handleTogglePrompt = () => {
    setShowPrompt(!showPrompt);
  };
  
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(idea.systemPrompt);
    // Could add a toast notification here
  };
  
  return (
    <IdeaContainer>
      <IdeaHeader>
        <GenieIcon>🧞</GenieIcon>
        <IdeaTitle>{idea.title}</IdeaTitle>
      </IdeaHeader>
      
      <IdeaDescription>
        {idea.description}
      </IdeaDescription>
      
      {idea.features && idea.features.length > 0 && (
        <>
          <h3>Key Features:</h3>
          <FeaturesList>
            {idea.features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>
        </>
      )}
      
      {idea.techStack && (
        <div>
          <h3>Suggested Tech Stack:</h3>
          <p>{idea.techStack}</p>
        </div>
      )}
      
      {idea.apiCost && (
        <div>
          <h3>Estimated API Cost:</h3>
          <p>{idea.apiCost}</p>
        </div>
      )}
      
      <ButtonsContainer>
        <GenerateCodeButton 
          onClick={onGenerateCode}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Code"}
        </GenerateCodeButton>
        
        <PromptButton 
          onClick={handleTogglePrompt}
        >
          {showPrompt ? "Hide Prompt" : "Show Prompt"}
        </PromptButton>
        
        <BackButton onClick={onBackToSlot}>
          Back to Slot Machine
        </BackButton>
      </ButtonsContainer>
      
      {showPrompt && idea.systemPrompt && (
        <PromptContainer>
          <PromptHeader>Prompt</PromptHeader>
          <PromptDescription>This is the detailed instruction set that can be used with AI code generation tools to create this software. You can copy and use it with your preferred AI assistant.</PromptDescription>
          <PromptText>
            {idea.systemPrompt}
          </PromptText>
          <CopyButton onClick={handleCopyPrompt}>
            Copy to Clipboard
          </CopyButton>
        </PromptContainer>
      )}
    </IdeaContainer>
  );
};

export default IdeaDisplay;