# Carly Backend

FastAPI backend for the Carly car recommendation engine.

## Architecture

The backend receives user preferences from the frontend, sends them to Claude via the Anthropic API to search Edmunds.com, and calculates weighted scores to rank the results.

### Flow

1. **Receive Request**: Frontend sends user preferences as JSON to `/api/recommendations`
2. **Call Claude**: Backend formats a prompt and calls Claude API to search Edmunds.com
3. **Parse Response**: Claude returns vehicle data with Edmunds scores in JSON format
4. **Calculate Scores**: Scoring service calculates weighted averages based on:
   - Edmunds Rating (30%)
   - Consumer Rating (20%)
   - Safety Score (30%)
   - Value Rating (20%)
5. **Rank & Return**: Vehicles are ranked by score and returned to frontend

## Setup

### 1. Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

Edit `.env` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_actual_api_key_here
```

### 3. Run the Server

```bash
# Development mode with auto-reload
uvicorn main:app --reload

# Or using the main.py script
python main.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Endpoints

### POST /api/recommendations

Submit user preferences and get ranked car recommendations.

**Request Body:**
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

**Response:**
```json
{
  "session_id": "uuid-string",
  "recommendations": [
    {
      "rank": 1,
      "vehicle": {
        "make": "Toyota",
        "model": "Camry Hybrid",
        "year": 2024,
        "price": 32000,
        "edmunds_url": "https://www.edmunds.com/...",
        "scores": {
          "edmunds_rating": 8.5,
          "consumer_rating": 8.7,
          "safety_score": 9.0,
          "value_rating": 8.3
        },
        "why_recommended": "Excellent fuel economy..."
      },
      "weighted_score": 8.65,
      "score_breakdown": {
        "edmunds_component": 2.55,
        "consumer_component": 1.74,
        "safety_component": 2.70,
        "value_component": 1.66,
        "total": 8.65
      }
    }
  ],
  "total_found": 5,
  "message": "Found 5 vehicle recommendations..."
}
```

## Project Structure

```
backend/
├── main.py                    # FastAPI application entry point
├── requirements.txt           # Python dependencies
├── .env                       # Environment variables (not in git)
├── models/
│   └── schemas.py            # Pydantic models for validation
├── routes/
│   └── recommendations.py    # API endpoint handlers
├── services/
│   ├── claude_service.py     # Anthropic API integration
│   └── scoring_service.py    # Weighted score calculation
└── utils/
    └── config.py             # Configuration management
```

## Configuration

Scoring weights can be adjusted in `.env`:

```env
WEIGHT_EDMUNDS=0.30      # Edmunds expert rating
WEIGHT_CONSUMER=0.20     # Consumer reviews
WEIGHT_SAFETY=0.30       # Safety scores
WEIGHT_VALUE=0.20        # Value for money
```

**Note**: Weights must sum to 1.0 or the application will fail to start.

## Development

### Logging

Set `DEBUG=True` in `.env` for verbose logging.

### Testing

Test the API using the interactive docs at `/docs` or with curl:

```bash
# Using the test request file
curl -X POST http://localhost:8000/api/recommendations \
  -H "Content-Type: application/json" \
  -d @test_request.json

# Or inline
curl -X POST http://localhost:8000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "seats": "2",
    "cargo": "3-4",
    "terrain": "snow",
    "towing": "light",
    "luxuryBrand": "luxury",
    "driveDaily": "yes",
    "tripMinutes": "45-60",
    "avgSpeed": 25
  }'
```

## Dependencies

- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **anthropic**: Anthropic API client
- **pydantic**: Data validation
- **pydantic-settings**: Environment configuration
- **python-dotenv**: Load environment variables

## Notes

- Claude API calls may take 5-15 seconds depending on the search complexity
- The system uses Claude Sonnet 3.5 for optimal balance of speed and quality
- Edmunds.com search is performed by Claude using its web browsing capabilities
