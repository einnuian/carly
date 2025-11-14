# Backend Setup Complete

The Carly backend skeleton has been successfully created with the following structure:

## Files Created

### Core Application
- `main.py` - FastAPI application with CORS, health checks, and router configuration
- `requirements.txt` - Python dependencies (FastAPI, Anthropic SDK, Pydantic)
- `.env` - Environment configuration (includes your Anthropic API key)
- `.gitignore` - Git ignore patterns for Python projects

### Models
- `models/schemas.py` - Pydantic models for request/response validation
  - `UserPreferencesRequest` - Matches your questionnaire format
  - `VehicleData` - Vehicle information from Claude
  - `EdmundsScore` - Score breakdown
  - `ScoredVehicle` - Ranked vehicle with weighted scores
  - `RecommendationResponse` - Final API response

### Services
- `services/claude_service.py` - Anthropic API integration
  - Builds prompts from user questionnaire data
  - Calls Claude to search Edmunds.com
  - Parses JSON responses
  
- `services/scoring_service.py` - Weighted scoring algorithm
  - Calculates weighted averages using configurable weights
  - Ranks vehicles by score
  - Provides score breakdowns

### Routes
- `routes/recommendations.py` - Main API endpoint
  - `POST /api/recommendations` - Receives questionnaire, returns ranked cars

### Utilities
- `utils/config.py` - Configuration management using Pydantic Settings
  - Loads environment variables
  - Validates scoring weights
  - Provides CORS configuration

### Documentation & Testing
- `README.md` - Complete documentation
- `test_request.json` - Sample request matching your questionnaire format
- `start.sh` - Quick start script

## Request Format

Your questionnaire sends data in this format:
```json
{
  "seats": "2",
  "cargo": "3-4",
  "terrain": "snow",
  "towing": "light",
  "luxuryBrand": "luxury",
  "driveDaily": "yes",
  "tripMinutes": "45-60",
  "avgSpeed": 25
}
```

## How It Works

1. Frontend sends questionnaire JSON to `POST /api/recommendations`
2. Backend validates the request using Pydantic
3. `claude_service` builds a prompt and calls Anthropic API
4. Claude searches Edmunds.com and returns vehicles with scores
5. `scoring_service` calculates weighted averages
6. Backend returns ranked list to frontend

## Scoring Algorithm

Configured in `.env`:
- Edmunds Rating: 30%
- Consumer Rating: 20%
- Safety Score: 30%
- Value Rating: 20%

## Next Steps

1. Start the backend: `./start.sh` or `uvicorn main:app --reload`
2. Test at http://localhost:8000/docs
3. Send a test request using `test_request.json`
4. Connect your React frontend to `POST http://localhost:8000/api/recommendations`

## Environment Variables

Your `.env` file is configured with:
- ANTHROPIC_API_KEY (already set)
- CORS_ORIGINS (allows localhost:5173 for Vite)
- DEBUG=True (verbose logging)
- Scoring weights (sum to 1.0)
