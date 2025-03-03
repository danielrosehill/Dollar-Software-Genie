#!/bin/bash

# Script to deploy The Dollar Software Genie to Vercel

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "Building the application..."
npm run build

echo "Deploying to Vercel..."

# Check if this is the first deployment
if [ ! -f .vercel/project.json ]; then
    echo "First time deployment. Linking to Vercel project..."
    vercel link
fi

# Deploy to Vercel
vercel --prod

echo "Deployment complete!"
echo "Your application is now available at the URL shown above."
echo ""
echo "Note: If you encounter any issues with the OpenAI API, make sure your API key is correctly entered in the application."