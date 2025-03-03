import React, { useState } from 'react';
import styled from 'styled-components';

const CodeContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: var(--background-light);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  color: var(--secondary-color);
  margin: 0;
`;

const CodeBlock = styled.div`
  background-color: var(--background-dark);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  max-height: 500px;
  overflow-y: auto;
`;

const CodeContent = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-primary);
  overflow-x: auto;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--text-primary);
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 1px solid #444;
`;

const Tab = styled.button`
  background-color: ${props => props.active ? 'var(--background-dark)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-primary)'};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
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
`;

const BackButton = styled(ActionButton)`
  background-color: transparent;
  border: 2px solid var(--text-secondary);
  color: var(--text-secondary);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const DownloadButton = styled(ActionButton)`
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    background-color: #3d8b40;
  }
`;

const CodeDisplay = ({ code, onBackToIdea, onBackToSlot }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Parse the code blocks from the generated code
  const codeBlocks = Array.isArray(code.files) ? code.files : [{ name: 'main.js', content: code.content || code }];
  
  const handleCopyCode = () => {
    const currentCode = codeBlocks[activeTab].content;
    navigator.clipboard.writeText(currentCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  const handleDownloadCode = () => {
    const currentBlock = codeBlocks[activeTab];
    const blob = new Blob([currentBlock.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentBlock.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleDownloadAll = () => {
    // For a real implementation, we would use JSZip to create a zip file
    // But for simplicity, we'll just download the current file
    handleDownloadCode();
  };
  
  return (
    <CodeContainer>
      <CodeHeader>
        <Title>Generated Code</Title>
      </CodeHeader>
      
      {codeBlocks.length > 1 && (
        <TabsContainer>
          {codeBlocks.map((block, index) => (
            <Tab 
              key={index}
              active={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {block.name}
            </Tab>
          ))}
        </TabsContainer>
      )}
      
      <CodeBlock>
        <CopyButton onClick={handleCopyCode}>
          {copySuccess ? 'Copied!' : 'Copy'}
        </CopyButton>
        <CodeContent>
          {codeBlocks[activeTab].content}
        </CodeContent>
      </CodeBlock>
      
      <ButtonsContainer>
        <DownloadButton onClick={handleDownloadCode}>
          Download File
        </DownloadButton>
        
        {codeBlocks.length > 1 && (
          <DownloadButton onClick={handleDownloadAll}>
            Download All Files
          </DownloadButton>
        )}
        
        <BackButton onClick={onBackToIdea}>
          Back to Idea
        </BackButton>
        
        <BackButton onClick={onBackToSlot}>
          Back to Slot Machine
        </BackButton>
      </ButtonsContainer>
    </CodeContainer>
  );
};

export default CodeDisplay;