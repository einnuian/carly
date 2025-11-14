#!/bin/bash

echo "Starting Carly Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if .env has API key
if grep -q "your_api_key_here" .env; then
    echo ""
    echo "WARNING: Please add your Anthropic API key to the .env file"
    echo "Edit .env and replace 'your_api_key_here' with your actual key"
    echo ""
fi

# Start the server
echo "Starting FastAPI server..."
echo "API will be available at: http://localhost:8000"
echo "API docs available at: http://localhost:8000/docs"
echo ""
uvicorn main:app --reload
