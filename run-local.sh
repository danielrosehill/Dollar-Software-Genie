#!/bin/bash

# Script to reliably run the application locally

# Unset HOST environment variable to prevent binding issues
unset HOST

# Display information
echo "Starting the application with HOST=localhost..."
echo "This will ensure the application binds to localhost instead of trying to resolve a hostname."
echo ""

# Start the application with explicit host and port
HOST=localhost PORT=3000 npm start