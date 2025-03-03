import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ApiKeyConfig from './components/ApiKeyConfig';
import SlotMachine from './components/SlotMachine';
import IdeaPreview from './components/IdeaPreview';
import IdeaDisplay from './components/IdeaDisplay';
import CodeDisplay from './components/CodeDisplay';
import CategorySelector from './components/CategorySelector';
import HowItWorks from './components/HowItWorks';
import { generateCode, generateIdea } from './services/llmService';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  background: linear-gradient(to right, #f9a825, #ff5722, #f9a825);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(249, 168, 37, 0.5);
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  background: linear-gradient(to right, #ff4081, #00bcd4, #ff4081);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(255, 64, 129, 0.9), 0 0 2px rgba(255, 255, 255, 0.8);
  animation: pulse 2s infinite;
  padding: 5px;
  border-radius: 5px;
  margin: 0.5rem 0;
`;

const MainContent = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;
`;

const HomeButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    background-color: #3d8b40;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1rem 0;
  text-align: center;
  color: var(--text-secondary);
  font-size: 1rem;
`;

const FooterLink = styled.a`
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const NavButton = styled.button`
  background-color: ${props => props.active ? '#4CAF50' : 'transparent'};
  color: ${props => props.active ? 'white' : '#FFFFFF'};
  border: 2px solid #4CAF50;
  border-radius: 30px;
  padding: 0.5rem 1.2rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#4CAF50' : 'rgba(76, 175, 80, 0.1)'};
  }
`;

function App() {
  const [apiKey, setApiKey] = useState('');
  const [currentIdea, setCurrentIdea] = useState(null);
  const [previewIdea, setPreviewIdea] = useState(null);
  const [generatedCode, setGeneratedCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('slot'); // 'slot', 'preview', 'idea', 'code'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previousIdeas, setPreviousIdeas] = useState([]);
  
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('dollarGenieApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('dollarGenieApiKey', apiKey);
    }
  }, [apiKey]);

  const handleIdeaPreview = (idea) => {
    setPreviewIdea(idea);
    setView('preview');
  };

  const handleIdeaGenerated = async (idea) => {
    // Add category to the idea if it doesn't have one
    if (!idea.category && selectedCategory !== 'all') {
      idea.category = selectedCategory;
    }
    
    // Add to previous ideas to avoid repetition
    setPreviousIdeas(prev => [...prev, idea.title]);
    setCurrentIdea(idea); 
    setView('idea');
  };

  const handleGenerateCode = async () => {
    if (!currentIdea) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const code = await generateCode(currentIdea, apiKey);
      setGeneratedCode(code);
      setView('code');
    } catch (err) {
      setError('Failed to generate code: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSlot = () => {
    setView('slot');
    setCurrentIdea(null);
    setPreviewIdea(null);
    setGeneratedCode(null);
  };
  
  const handleHowItWorksView = () => {
    setView('howItWorks');
  };


  const handleBackToIdea = () => {
    setView('idea');
    setGeneratedCode(null);
  };

  const handleSpinForFortune = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newIdea = await generateIdea(apiKey, selectedCategory, previousIdeas);
      
      // Add to previous ideas to avoid repetition
      setPreviousIdeas(prev => [...prev, newIdea.title]);
      
      // Update the current idea with the new idea
      setCurrentIdea(newIdea);
      
      // Stay in the idea view
      setView('idea');
    } catch (err) {
      setError('Failed to generate idea: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextIdea = async () => {
    // Instead of going back to slot machine, directly generate a new idea
    setIsLoading(true);
    setError(null);
    
    try {
      const newIdea = await generateIdea(apiKey, selectedCategory, previousIdeas);
      
      // Add to previous ideas to avoid repetition
      setPreviousIdeas(prev => [...prev, newIdea.title]);
      
      // Update the preview with the new idea
      setPreviewIdea(newIdea);
      
      // Stay in the preview view
      setView('preview');
    } catch (err) {
      setError('Failed to generate idea: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPreviousIdeas([]); // Reset previous ideas when category changes
  };

  return (
    <AppContainer>
      <Header>
        <Title>$1 AI Software Software Genie</Title>
        <Subtitle>✨ ONE DOLLAR STANDS BETWEEN YOU AND UNTOLD DIGITAL RICHES! ✨</Subtitle>
      </Header>

      <ApiKeyConfig apiKey={apiKey} setApiKey={setApiKey} />

      <NavBar>
        <NavButton 
          active={view === 'howItWorks'} 
          onClick={handleHowItWorksView}>
          How It Works
        </NavButton>
      </NavBar>
      <MainContent>
        {view !== 'slot' && (
          <HomeButton onClick={handleBackToSlot} title="Back to Homepage">
            🏠
          </HomeButton>
        )}
        
        {view === 'slot' && (
          <>
            <CategorySelector 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <SlotMachine 
              onIdeaGenerated={handleIdeaPreview} 
              apiKey={apiKey}
              selectedCategory={selectedCategory}
              previousIdeas={previousIdeas}
            />
          </>
        )}
        
        {view === 'preview' && previewIdea && (
          <IdeaPreview 
            idea={previewIdea}
            onInterested={() => handleIdeaGenerated(previewIdea)}
            onNextIdea={handleNextIdea}
            isLoading={isLoading}
          />
        )}

        {view === 'idea' && currentIdea && (
          <IdeaDisplay
            idea={currentIdea} 
            onGenerateCode={handleGenerateCode}
            onBackToSlot={handleBackToSlot}
            isLoading={isLoading}
            onSpinForFortune={handleSpinForFortune}
          />
        )}

        {view === 'code' && generatedCode && (
          <CodeDisplay 
            code={generatedCode} 
            onBackToIdea={handleBackToIdea}
            onBackToSlot={handleBackToSlot}
          />
        )}
        
        {view === 'howItWorks' && (
          <HowItWorks 
            onBackToSlot={handleBackToSlot}
          />
        )}

        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>
            {error}
          </div>
        )}
      </MainContent>

      <Footer>
        &copy; {new Date().getFullYear()} $1 AI Software Software Genie | By Daniel Rosehill | <FooterLink href="https://danielrosehill.com" target="_blank" rel="noopener noreferrer">danielrosehill.com</FooterLink>
      </Footer>
    </AppContainer>
  );
}

export default App;