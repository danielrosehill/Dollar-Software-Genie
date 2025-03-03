#!/bin/bash

# Script to test API endpoints

# Default URL
URL=${1:-"http://localhost:3000"}

echo "Testing API endpoints at $URL"
echo ""

# Test API root endpoint
echo "Testing API root endpoint..."
curl -X POST "$URL/api" \
  -H "Content-Type: application/json" \
  -d '{"test":true}' \
  -i

echo ""
echo ""

# Test OpenAI proxy endpoint
echo "Testing OpenAI proxy endpoint..."
curl -X POST "$URL/api/openai-proxy" \
  -H "Content-Type: application/json" \
  -d '{"test":true}' \
  -i

echo ""
echo ""
echo "API tests complete!"
echo "Note: A 405 Method Not Allowed error is expected if the routing is working correctly,"
echo "      since we're not providing valid OpenAI API requests."