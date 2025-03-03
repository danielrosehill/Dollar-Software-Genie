import React, { useState } from 'react';
import styled from 'styled-components';

// Check if we're in production (deployed to Hugging Face)
const isHuggingFace = typeof window !== 'undefined' && window.location.hostname.includes('huggingface.co');
const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
const isDeployed = isHuggingFace || isVercel;

const ConfigContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: var(--background-light);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const ConfigHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 0;
  color: var(--text-primary);
`;

const ToggleIcon = styled.span`
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;

const ConfigContent = styled.div`
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: var(--background-dark);
  color: var(--text-primary);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const HelpText = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
`;

const WarningText = styled.div`
  background-color: rgba(255, 193, 7, 0.2);
  border-left: 4px solid #ffc107;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const SaveButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3d8b40;
  }
`;

const ApiKeyConfig = ({ apiKey, setApiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(apiKey);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSave = () => {
    setApiKey(inputValue);
    setShowConfirmation(true);
    setTimeout(() => { setShowConfirmation(false); setIsOpen(false); }, 3000);
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  return (
    <ConfigContainer>
      <ConfigHeader onClick={toggleOpen}>
        <Title>API Configuration</Title>
        <ToggleIcon $isOpen={isOpen || showConfirmation}>▼</ToggleIcon>
      </ConfigHeader>
      
      <ConfigContent $isOpen={isOpen || showConfirmation}>
        {showConfirmation ? (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'rgba(76, 175, 80, 0.2)', 
            borderRadius: '4px',
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'var(--primary-color)'
          }}>
            🎉 You've taken the first step towards fortune! 🎉
          </div>
        ) : (
        <InputGroup>
          <Label htmlFor="apiKey">OpenAI API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="sk-..."
          />
          <HelpText>
            Your API key is stored locally in your browser and never sent to our servers.
            You can get an API key from the <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>OpenAI dashboard</a>.
            {isHuggingFace && (
              <WarningText>
                <strong>Note:</strong> When using this app on Hugging Face Spaces, direct API calls to OpenAI may be blocked due to CORS restrictions. 
                If you experience issues, you can still use the app with the sample ideas (no API key required).
                For full functionality with your own API key, consider running the app locally.
              </WarningText>
            )}
            {isVercel && (
              <WarningText>
                <strong>Note:</strong> This app is deployed on Vercel with a serverless API proxy to handle OpenAI API calls.
                Your API key is sent directly to OpenAI through our secure proxy and is never stored on our servers.
              </WarningText>
            )}
          </HelpText>
        </InputGroup>
        )}
        {!showConfirmation && (
        <SaveButton onClick={handleSave}>Save API Key</SaveButton>
        )}
      </ConfigContent>
    </ConfigContainer>
  );
};

export default ApiKeyConfig;