// LLM Service for generating ideas and code using OpenAI API

// Sample ideas for development or when API key is not provided
const SAMPLE_IDEAS = [
  {
    title: "Weather Mood Tracker",
    description: "A simple web app that correlates local weather with your daily mood entries. It uses a weather API to fetch current conditions and allows users to log their mood and activities. Over time, it shows patterns between weather and mood.",
    features: [
      "Daily mood and activity logging",
      "Local weather integration",
      "Correlation visualizations",
      "Weekly and monthly mood summaries"
    ],
    techStack: "HTML, CSS, JavaScript, OpenWeatherMap API",
    category: "personal",
    apiCost: "Approximately $0.50-$1.00 in API calls for development and testing",
    systemPrompt: `Create a simple web application called "Weather Mood Tracker" that:
1. Fetches local weather data using the OpenWeatherMap API
2. Allows users to log their daily mood on a 1-5 scale
3. Lets users record activities they did that day
4. Shows visualizations of mood patterns correlated with weather
5. Provides weekly and monthly summaries

The app should use HTML, CSS, and vanilla JavaScript. Store data in localStorage.
Include all necessary code to make this a functional application that can be opened directly in a browser.`
  },
  {
    title: "Recipe Cost Calculator",
    description: "A utility that helps home cooks calculate the cost of their recipes. Users can input ingredients and their prices, and the app will calculate the total cost and cost per serving.",
    features: [
      "Ingredient cost database",
      "Recipe cost calculation",
      "Cost per serving breakdown",
      "Recipe saving and sharing"
    ],
    techStack: "HTML, CSS, JavaScript, localStorage",
    category: "productivity",
    apiCost: "No API costs - purely frontend implementation",
    systemPrompt: `Create a "Recipe Cost Calculator" web application that:
1. Allows users to create and save recipes
2. Lets users input ingredients with their quantities and prices
3. Calculates the total recipe cost and cost per serving
4. Provides a way to save and share recipes
5. Includes a small database of common ingredient prices

Use HTML, CSS, and vanilla JavaScript. Store data in localStorage.
The application should be fully functional when opened in a browser.`
  },
  {
    title: "Markdown Note Taker",
    description: "A browser-based markdown editor that saves notes locally. It features live preview, organization by tags, and search functionality.",
    features: [
      "Live markdown preview",
      "Local storage of notes",
      "Tag-based organization",
      "Full-text search",
      "Export to PDF or HTML"
    ],
    techStack: "HTML, CSS, JavaScript, marked.js (for markdown parsing)",
    category: "productivity",
    apiCost: "No API costs - purely frontend implementation",
    systemPrompt: `Create a "Markdown Note Taker" web application that:
1. Provides a markdown editor with live preview
2. Automatically saves notes to localStorage
3. Allows organizing notes with tags
4. Includes full-text search functionality
5. Lets users export notes as PDF or HTML

Use HTML, CSS, and JavaScript. You may use the marked.js library for markdown parsing.
The application should work entirely in the browser with no backend required.`
  }
  ,
  {
    title: "Daily Habit Tracker",
    description: "A simple web app that helps users track their daily habits and build consistency. It provides visual feedback on streaks and progress over time.",
    features: [
      "Daily habit check-ins",
      "Streak tracking",
      "Progress visualization",
      "Reminder settings"
    ],
    techStack: "HTML, CSS, JavaScript, localStorage",
    category: "personal",
    apiCost: "No API costs - purely frontend implementation",
    systemPrompt: `Create a "Daily Habit Tracker" web application that:
1. Allows users to create and track daily habits
2. Shows visual streaks for consistent habit completion
3. Provides progress charts over time
4. Lets users set reminders for their habits

Use HTML, CSS, and JavaScript. Store data in localStorage.
The application should be fully functional when opened in a browser.`
  },
  {
    title: "Email Template Generator",
    description: "A tool that helps users quickly generate professional email templates for common scenarios like follow-ups, introductions, and meeting requests.",
    features: [
      "Template categories",
      "Customizable fields",
      "Copy to clipboard",
      "Save favorite templates"
    ],
    techStack: "HTML, CSS, JavaScript, localStorage",
    category: "work",
    apiCost: "No API costs - purely frontend implementation",
    systemPrompt: `Create an "Email Template Generator" web application that:
1. Provides templates for common email scenarios
2. Allows customization of key fields (names, dates, etc.)
3. Enables one-click copying to clipboard
4. Lets users save their favorite templates

Use HTML, CSS, and JavaScript. Store data in localStorage.
The application should be fully functional when opened in a browser.`
  }
];

/**
 * Generate a software idea using OpenAI API
 * @param {string} apiKey - OpenAI API key
 * @returns {Promise<Object>} - Generated idea object
 */
export const generateIdea = async (apiKey, category = 'all', previousIdeas = []) => {
  // If no API key is provided, return a random sample idea
  if (!apiKey) {
    // Filter ideas by category if specified
    const filteredIdeas = category === 'all' 
      ? SAMPLE_IDEAS 
      : SAMPLE_IDEAS.filter(idea => idea.category === category);
    
    // Filter out previously shown ideas
    let availableIdeas = filteredIdeas;
    
    if (previousIdeas.length > 0) {
      availableIdeas = filteredIdeas.filter(idea => 
        !previousIdeas.includes(idea.title)
      );
    }
    
    // If all ideas have been shown, reset and show all again
    if (availableIdeas.length === 0) {
      // If we've shown all ideas, pick a random one but make sure it's different from the most recent one
      const mostRecentIdea = previousIdeas[previousIdeas.length - 1];
      return filteredIdeas.find(idea => idea.title !== mostRecentIdea) || filteredIdeas[Math.floor(Math.random() * filteredIdeas.length)];
    }
    
    return availableIdeas[Math.floor(Math.random() * availableIdeas.length)];
  }
  
  try {
    // Determine if we're in development or production
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Check if we're deployed to Vercel - more robust check
    const isVercel = typeof window !== 'undefined' && (
      window.location.hostname.includes('vercel.app') || 
      window.location.hostname === 'dollar-software-genie.vercel.app'
    );
    
    // Always use the local API proxy when on Vercel
    let apiUrl;
    if (isVercel) {
      apiUrl = '/api';
      console.log('Using Vercel API proxy for code generation');
    } else if (isProduction) {
      apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/chat/completions';
      console.log('Using CORS proxy for code generation');
    } else {
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      console.log('Using direct OpenAI API for code generation');
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an EXTREMELY creative and RIDICULOUS software idea generator. Generate a completely absurd yet somehow still useful idea for a small software project that could be built for approximately $1 or less in API fees using AI code generation tools. Be over-the-top, quirky, and unexpected - the more outlandish the better, as long as it's still technically feasible. ${category !== 'all' ? `The ridiculous idea should be in the category: ${category}.` : ''} ${previousIdeas.length > 0 ? `Avoid these previously generated ideas: ${previousIdeas.join(', ')}.` : ''}
            
The idea should be practical, useful, and implementable as a small project. Focus on web apps, utilities, or tools that solve real problems.

Respond with a JSON object with the following structure:
{
  "title": "Name of the software",
  "description": "A paragraph describing what the software does and why it's useful",
  "features": ["Feature 1", "Feature 2", "Feature 3", ...],
  "techStack": "Brief description of suggested technologies",
  "category": "${category !== 'all' ? category : 'Choose one: personal, work, productivity, entertainment, utility'}",
  "apiCost": "Brief explanation of why this would cost ~$1 or less in API fees",
  "systemPrompt": "A detailed prompt that could be given to an AI code generator to create this software"
}

The systemPrompt should be detailed enough that an AI code generator could create a working version of the software from it.`
          },
          {
            role: 'user',
            content: 'Generate a random $1 software idea.'
          }
        ],
        temperature: 1.0,
        max_tokens: 1000
      })
    });
    
    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response error:', response.status, errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    // Try to parse the response as JSON
    let data;
    try {
      data = await response.json();
    } catch (error) {
      const rawText = await response.text();
      console.error('Failed to parse API response as JSON:', rawText);
      throw new Error('Failed to parse API response as JSON');
    }
    
    if (data.error) {
      throw new Error(data.error.message || 'Error generating idea');
    }
    
    // Parse the JSON from the response
    const content = data.choices[0].message.content;
    try {
      return JSON.parse(content);
    } catch (e) {
      // If parsing fails, try to extract JSON using regex
      const jsonMatch = content.match(/({[\s\S]*})/);
      if (jsonMatch && jsonMatch[0]) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse response from OpenAI');
    }
  } catch (error) {
    console.error('Error generating idea:', error);
    throw error;
  }
};

/**
 * Generate code for a software idea using OpenAI API
 * @param {Object} idea - The idea object
 * @param {string} apiKey - OpenAI API key
 * @returns {Promise<Object>} - Generated code
 */
export const generateCode = async (idea, apiKey) => {
  // If no API key is provided, return a sample code
  if (!apiKey) {
    return {
      files: [
        {
          name: 'index.html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${idea.title}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Sample Code for ${idea.title}</h1>
  <p>This is a placeholder. Please provide an API key to generate real code.</p>
  <script src="script.js"></script>
</body>
</html>`
        },
        {
          name: 'styles.css',
          content: `body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
}`
        },
        {
          name: 'script.js',
          content: `// Sample code for ${idea.title}
console.log('Please provide an API key to generate real code');`
        }
      ]
    };
  }
  
  try {
    // Determine if we're in development or production
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Check if we're deployed to Vercel - more robust check
    const isVercel = typeof window !== 'undefined' && (
      window.location.hostname.includes('vercel.app') || 
      window.location.hostname === 'dollar-software-genie.vercel.app'
    );
    
    // Always use the local API proxy when on Vercel
    let apiUrl;
    if (isVercel) {
      apiUrl = '/api';
      console.log('Using Vercel API proxy');
    } else if (isProduction) {
      apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/chat/completions';
      console.log('Using CORS proxy');
    } else {
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      console.log('Using direct OpenAI API');
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an expert software developer. Your task is to generate code for the following software idea. 
            
Create a complete, working implementation that can be run directly in a browser. Organize your response as a JSON object with an array of files, where each file has a name and content.

Respond with a JSON object with the following structure:
{
  "files": [
    {
      "name": "filename.ext",
      "content": "// Full file content here"
    },
    ...
  ]
}

Make sure the code is complete, well-commented, and follows best practices. Include all necessary HTML, CSS, and JavaScript files to make the application work.`
          },
          {
            role: 'user',
            content: `Generate code for the following software idea:
            
Title: ${idea.title}
Description: ${idea.description}
Features: ${idea.features.join(', ')}
Tech Stack: ${idea.techStack}

Prompt: ${idea.systemPrompt}`
          }
        ],
        temperature: 0.2,
        max_tokens: 4000
      })
    });
    
    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response error:', response.status, errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    // Try to parse the response as JSON
    let data;
    try {
      data = await response.json();
    } catch (error) {
      const rawText = await response.text();
      console.error('Failed to parse API response as JSON:', rawText);
      throw new Error('Failed to parse API response as JSON');
    }
    
    if (data.error) {
      throw new Error(data.error.message || 'Error generating code');
    }
    
    // Parse the JSON from the response
    const content = data.choices[0].message.content;
    try {
      return JSON.parse(content);
    } catch (e) {
      // If parsing fails, try to extract JSON using regex
      const jsonMatch = content.match(/({[\s\S]*})/);
      if (jsonMatch && jsonMatch[0]) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // If still fails, return the raw content
      return {
        files: [
          {
            name: 'response.txt',
            content: content
          }
        ]
      };
    }
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};