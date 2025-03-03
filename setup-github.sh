#!/bin/bash

# Script to set up a GitHub repository for The Dollar Software Genie

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git first."
    exit 1
fi

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI is not installed. Installing..."
    # For Ubuntu/Debian
    if command -v apt &> /dev/null; then
        sudo apt update
        sudo apt install -y gh
    # For macOS
    elif command -v brew &> /dev/null; then
        brew install gh
    else
        echo "Could not install GitHub CLI automatically. Please install it manually: https://cli.github.com/"
        exit 1
    fi
fi

# Check if user is logged in to GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "Please log in to GitHub CLI:"
    gh auth login
fi

# Ask for repository name
read -p "Enter repository name (default: dollar-software-genie): " REPO_NAME
REPO_NAME=${REPO_NAME:-dollar-software-genie}

# Create a new repository on GitHub
echo "Creating a new public repository on GitHub: $REPO_NAME"
gh repo create "$REPO_NAME" --public --source=. --remote=origin

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files to git
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit"

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main || git push -u origin master

echo "Repository setup complete!"
echo "Your code is now available at: https://github.com/$(gh api user | jq -r .login)/$REPO_NAME"
echo ""
echo "Now you can deploy to Vercel using:"
echo "./deploy-to-vercel.sh"