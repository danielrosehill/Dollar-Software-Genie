#!/bin/bash

# Dollar Software Genie Setup Script

echo "Setting up The Dollar Software Genie..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create placeholder logo files if they don't exist
echo "Creating placeholder logo files..."
mkdir -p public/assets

# Download a genie emoji SVG for the favicon
echo "Downloading genie emoji SVG..."
cat > public/assets/genie.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="45" fill="#9c27b0" />
  <text x="50" y="70" font-family="Arial" font-size="60" text-anchor="middle" fill="#f9a825">🧞</text>
</svg>
EOL

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cat > .env << 'EOL'
# OpenAI API Key (replace with your actual key)
REACT_APP_OPENAI_API_KEY=

# Host configuration
HOST=localhost
EOL
fi

echo "Setup complete!"
echo "Run 'npm start' to start the development server."