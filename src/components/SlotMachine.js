import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { generateIdea } from '../services/llmService';

// Animation keyframes
const spin = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-300px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px var(--secondary-color); }
  50% { box-shadow: 0 0 20px var(--secondary-color), 0 0 30px var(--secondary-color); }
  100% { box-shadow: 0 0 5px var(--secondary-color); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const rainbow = keyframes`
  0% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(180deg); }
  100% { filter: hue-rotate(360deg); }
`;

// Styled components
const SlotMachineContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: var(--background-light);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GenieCharacter = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

const GenieImage = styled.img`
  height: 140px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const SlotWindow = styled.div`
  width: 100%;
  height: 100px;
  background-color: var(--background-dark);
  border: 3px solid var(--secondary-color);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin: 1rem 0;
  animation: ${props => props.$spinning ? glow : 'none'} 1.5s infinite;
`;

const SlotContent = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  padding: 1rem;
  animation: ${props => props.$spinning ? spin : 'none'} 0.8s linear infinite;
`;

const SlotItem = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  font-weight: bold;
  text-shadow: 0 0 5px var(--secondary-color);
  padding: 0 1rem;
  transform: scale(1.1);
`;

const SlotLever = styled.div`
  width: 20px;
  height: 120px;
  background-color: #888;
  border-radius: 10px;
  position: relative;
  margin: 0 auto;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: var(--secondary-color);
    border-radius: 50%;
    top: -20px;
    left: -10px;
  }
`;

const AnimatedLever = animated(SlotLever);

const SpinButton = styled.button`
  background-color: var(--secondary-color);
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  margin-top: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    animation: ${rainbow} 2s linear infinite;
    box-shadow: 0 0 15px var(--secondary-color);
  }
  
  &:disabled {
    background-color: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Sample slot items for animation
const slotItems = [
  "✨ Great Richness Awaits ✨",
  "💰 Your Million Dollar Idea! 💰",
  "🚀 Your Next Breakthrough One Prompt Away 🚀",
  "💎 Digital Gold Mine Incoming 💎",
  "🔮 The Genie Knows Your Fortune 🔮",
  "🤑 Quit Your Job Tomorrow! 🤑",
  "🏆 Investors Will Fight Over This! 🏆",
  "💡 Genius Strikes in 3...2...1... 💡",
  "🌟 Fame and Glory Approaching 🌟",
  "🎯 Bullseye Brilliance Loading... 🎯"
];

const SlotMachine = ({ onIdeaGenerated, apiKey, selectedCategory, previousIdeas = [] }) => {
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState(null);
  const [idea, setIdea] = useState(null);
  
  // Reference for timeout to clear it if needed
  const spinTimeoutRef = useRef(null);
  
  // Spring animation for the lever
  const [leverProps, setLever] = useSpring(() => ({
    rotateZ: 0,
    config: { tension: 200, friction: 20 }
  }));
  
  const handleSpin = async () => {
    if (!apiKey) {
      setError("Please enter your API key first");
      return;
    }
    
    setError(null);
    setSpinning(true);
    setIdea(null);
    
    // Animate the lever
    setLever({ rotateZ: 45 });
    setTimeout(() => setLever({ rotateZ: 0 }), 500);
    
    try {
      // Generate idea from LLM service
      const generatedIdea = await generateIdea(apiKey, selectedCategory, previousIdeas);
      
      // Simulate spinning for a random time between 2-4 seconds
      const spinTime = Math.random() * 2000 + 2000;
      
      spinTimeoutRef.current = setTimeout(() => {
        setSpinning(false);
        setIdea(generatedIdea);
        onIdeaGenerated(generatedIdea);
      }, spinTime);
      
    } catch (err) {
      setSpinning(false);
      setError(`Failed to generate idea: ${err.message}`);
    }
  };
  
  return (
    <SlotMachineContainer>
      <GenieCharacter>
        <GenieImage src="https://res.cloudinary.com/drrvnflqy/image/upload/v1740968699/sloth-genie_j1vbw7.webp" alt="Sloth Wizard" />
      </GenieCharacter>
      
      <SlotWindow $spinning={spinning}>
        {spinning ? (
          <SlotContent $spinning={spinning}>
            {slotItems.map((item, index) => (
              <SlotItem key={index}>{item}</SlotItem>
            ))}
          </SlotContent>
        ) : (
          <SlotContent>
            <SlotItem>
              {idea ? idea.title : "Pull the lever to generate an idea!"}
            </SlotItem>
          </SlotContent>
        )}
      </SlotWindow>
      
      <AnimatedLever 
        style={{ 
          transform: leverProps.rotateZ.to(r => `rotateZ(${r}deg)`)
        }}
        onClick={!spinning ? handleSpin : undefined}
      />
      
      <SpinButton 
        onClick={handleSpin} 
        disabled={spinning || !apiKey}
      >
        {spinning ? "✨ MAGIC HAPPENING... ✨" : "💰 SPIN FOR FORTUNE! 💰"}
      </SpinButton>
      
      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          {error}
        </div>
      )}
    </SlotMachineContainer>
  );
};

export default SlotMachine;