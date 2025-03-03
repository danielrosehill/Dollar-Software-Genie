import React from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 600px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 2px solid var(--secondary-color);
  background-color: var(--background-dark);
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px var(--secondary-color);
  }
  
  option {
    background-color: var(--background-dark);
  }
`;

// Available idea categories
export const IDEA_CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'personal', name: 'Personal Development' },
  { id: 'work', name: 'Work Automation' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'utility', name: 'Utility' }
];

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  return (
    <SelectorContainer>
      <Label htmlFor="category-select">Select Idea Category:</Label>
      <Select 
        id="category-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {IDEA_CATEGORIES.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </SelectorContainer>
  );
};

export default CategorySelector;