#!/bin/bash

# Script to test the build process locally

echo "Building the application..."
npm run build

echo "Checking the build directory..."
ls -la build/

echo "Copying huggingface-space.yml to build/.huggingface-space..."
cp huggingface-space.yml build/.huggingface-space

echo "Checking the build directory again..."
ls -la build/

echo "Build test complete!"