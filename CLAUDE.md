# Carly - AI-Powered Car Recommendation Engine

## Project Overview

Carly is an intelligent car recommendation system that helps users find their ideal vehicle by analyzing their needs, preferences, and budget. The system uses a questionnaire-based approach combined with LLM-powered search and a sophisticated scoring algorithm to deliver personalized car recommendations.

## How It Works

1. **User Questionnaire**: Users answer a series of questions about their:
   - Budget constraints
   - Vehicle needs (passenger capacity, cargo space, etc.)
   - Preferences (fuel efficiency, performance, features)
   - Usage patterns (commuting, family trips, off-road, etc.)

2. **Data Processing**: User responses are collected and formatted into a structured JSON payload

3. **LLM-Powered Search**: The JSON is sent to a configurable LLM that:
   - Interprets user requirements
   - Searches Edmunds.com for matching vehicles
   - Returns vehicle data with Edmunds scores

4. **Intelligent Ranking**: The backend calculates a weighted average of scores for each car to generate a final ranking

5. **Results Presentation**: Users receive a ranked list of recommended vehicles with detailed information

## Technology Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.2
- **Language**: JavaScript/JSX
- **UI**: Modern, responsive interface for questionnaire and results

### Backend (Planned)
- **Framework**: FastAPI (Python)
- **Purpose**:
  - API endpoints for questionnaire submission
  - LLM integration and orchestration
  - Score calculation and ranking logic
  - Data validation and error handling

### External Integrations
- **LLM Provider**: Configurable (OpenAI, Anthropic Claude, etc.)
- **Data Source**: Edmunds.com vehicle database

## Project Structure

```
carly/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── main.jsx         # Application entry point
│   │   └── components/      # (To be created) UI components
│   ├── package.json
│   └── vite.config.js
├── backend/                  # (To be created) FastAPI backend
│   ├── main.py              # FastAPI application entry
│   ├── models/              # Data models and schemas
│   ├── routes/              # API endpoints
│   ├── services/            # Business logic
│   │   ├── llm_service.py   # LLM integration
│   │   ├── scoring.py       # Score calculation logic
│   │   └── edmunds.py       # Edmunds data handling
│   └── requirements.txt
└── CLAUDE.md                # This file
```

## Key Features

### Questionnaire System
- Dynamic form with progressive disclosure
- Input validation and helpful guidance
- Save and resume functionality (planned)
- Mobile-responsive design

### LLM Integration
- Provider-agnostic design (swap between OpenAI, Claude, etc.)
- Structured prompt engineering for accurate vehicle matching
- JSON schema validation for reliable data parsing
- Error handling and fallback mechanisms

### Scoring Algorithm
- Weighted average calculation based on multiple factors:
  - Edmunds expert ratings
  - Consumer reviews
  - Safety scores
  - Reliability ratings
  - Value for money
- Configurable weights for different score components
- Transparent scoring methodology

### Results Display
- Ranked list of recommended vehicles
- Detailed vehicle specifications
- Side-by-side comparison view
- Links to full Edmunds reviews
- Explanation of why each vehicle was recommended

## Development Status

### Current State
- ✅ React + Vite frontend skeleton initialized
- ✅ Development environment configured
- ✅ ESLint for code quality

### In Progress
- ⏳ Questionnaire UI components
- ⏳ Backend FastAPI setup
- ⏳ LLM service integration
- ⏳ Scoring algorithm implementation

### Planned Features
- 📋 User authentication and saved preferences
- 📋 Vehicle comparison tools
- 📋 Price tracking and alerts
- 📋 Dealer inventory integration
- 📋 Test drive scheduling
- 📋 Financing calculator

## Getting Started

### Frontend Development

```bash
cd carly/frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Development (Coming Soon)

```bash
cd carly/backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Design (Planned)

### Submit Questionnaire
```
POST /api/questionnaire
Content-Type: application/json

{
  "budget": {
    "min": 20000,
    "max": 35000
  },
  "preferences": {
    "bodyType": ["sedan", "suv"],
    "fuelType": ["hybrid", "electric"],
    "passengers": 5,
    "features": ["safety_tech", "infotainment"]
  },
  "usage": {
    "primaryUse": "commute",
    "milesPerYear": 12000
  }
}
```

### Get Recommendations
```
GET /api/recommendations/{session_id}

Response:
{
  "recommendations": [
    {
      "rank": 1,
      "vehicle": {
        "make": "Toyota",
        "model": "Camry Hybrid",
        "year": 2024,
        "edmundsUrl": "..."
      },
      "scores": {
        "overall": 8.7,
        "edmundsRating": 8.5,
        "consumerRating": 8.9,
        "safety": 9.0,
        "value": 8.5
      },
      "matchReason": "Excellent fuel efficiency and reliability..."
    }
  ]
}
```

## Configuration

### Environment Variables

```env
# Backend
LLM_PROVIDER=openai  # or anthropic, etc.
LLM_API_KEY=your_api_key_here
EDMUNDS_API_KEY=your_edmunds_key
SCORING_WEIGHTS={"edmunds": 0.3, "consumer": 0.2, "safety": 0.3, "value": 0.2}

# Frontend
VITE_API_URL=http://localhost:8000
```

## Scoring Methodology

The recommendation engine uses a weighted scoring system:

1. **Edmunds Expert Rating** (30%): Professional automotive journalist reviews
2. **Consumer Reviews** (20%): Real owner feedback and satisfaction
3. **Safety Scores** (30%): NHTSA and IIHS safety ratings
4. **Value Rating** (20%): Cost vs. features and long-term ownership costs

The weights can be adjusted based on user priorities indicated in the questionnaire.

## LLM Prompt Strategy

The system uses structured prompts to ensure consistent, parseable responses:

```
You are a car recommendation expert. Based on the following user requirements:
{user_json}

Search Edmunds.com and return a JSON list of the top 5-10 vehicles that match.
For each vehicle, include:
- Make, model, year
- Edmunds rating
- Brief description
- Why it matches the user's needs

Format: {"vehicles": [...]}
```

## Contributing

This is currently a personal project. Contribution guidelines will be added as the project matures.

## Future Enhancements

- Machine learning for personalized weight optimization
- Integration with multiple vehicle data sources
- Real-time inventory and pricing from local dealers
- Mobile app version
- Social features (share recommendations, reviews)
- Advanced filtering and sorting options

## License

[To be determined]

## Contact

[Project maintainer information to be added]

---

**Note**: This project is in active development. Features and architecture may change as development progresses.
