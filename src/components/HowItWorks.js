import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #4CAF50; /* Using explicit color instead of var */
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 2px solid #4CAF50; /* Using explicit color instead of var */
  padding-bottom: 0.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #FF9800; /* Using explicit color instead of var */
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #333333; /* Dark gray for better readability */
`;

const StepList = styled.ol`
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Step = styled.li`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 0.8rem;
  color: #333333; /* Dark gray for better readability */
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #4CAF50; /* Using explicit color instead of var */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: #4CAF50; /* Using explicit color instead of var */
  color: white;
  border: none;
  border-radius: 30px;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #3d8b40; /* Darker green for hover state */
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const HowItWorks = ({ onBackToSlot }) => {
  return (
    <Container>
      <Title>How The $1 AI Software Genie Works</Title>
      
      <Section>
        <SectionTitle>The Concept</SectionTitle>
        <Paragraph>
          The $1 AI Software Genie is a fun and innovative tool that generates unique software ideas and provides starter code to help bring those ideas to life. It's designed to inspire developers, entrepreneurs, and creators by suggesting novel software concepts that could potentially be worth millions!
        </Paragraph>
        <Paragraph>
          The name comes from the idea that for just $1 worth of AI compute, you could generate an idea that becomes the next big thing in tech. It's a playful take on the "million-dollar idea" concept.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>How to Use It</SectionTitle>
        <StepList>
          <Step>
            <Highlight>Enter your API Key</Highlight> - Provide your API key to enable the AI-powered idea generation.
          </Step>
          <Step>
            <Highlight>Select a Category</Highlight> - Choose a specific category or keep it set to "All Categories" for a wider range of ideas.
          </Step>
          <Step>
            <Highlight>Spin the Slot Machine</Highlight> - Click the lever to generate a random software idea.
          </Step>
          <Step>
            <Highlight>Preview the Idea</Highlight> - Review the generated idea and decide if you're interested or want to try another one.
          </Step>
          <Step>
            <Highlight>Explore the Full Idea</Highlight> - If you like the preview, click "I'm Interested!" to see the complete idea with more details.
          </Step>
          <Step>
            <Highlight>Generate Code</Highlight> - Once you've found an idea you love, generate starter code to begin implementing it.
          </Step>
        </StepList>
      </Section>
      
      <Section>
        <SectionTitle>Behind the Scenes</SectionTitle>
        <Paragraph>
          The $1 AI Software Genie uses advanced AI language models to create unique software ideas based on current trends, technological possibilities, and creative combinations of features. Each idea is generated on-the-fly and includes a title, description, potential features, and target audience.
        </Paragraph>
        <Paragraph>
          When you request code generation, the AI creates starter code that provides a foundation for implementing the idea. This code is meant to be a starting point that you can build upon and customize to your needs.
        </Paragraph>
      </Section>
      
      <ButtonContainer>
        <Button onClick={onBackToSlot}>Back to Genie</Button>
      </ButtonContainer>
    </Container>
  );
};

export default HowItWorks;