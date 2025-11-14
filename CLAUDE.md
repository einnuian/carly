# Carly - AI-Powered Car Recommendation Engine

## Project Overview

Carly is an intelligent car recommendation system that helps users find their ideal vehicle by analyzing their needs, preferences, and budget. The system uses a questionnaire-based approach combined with Claude AI (Anthropic API) and a user-priority-based ranking algorithm to deliver personalized car recommendations.

## How It Works

1. **User Questionnaire (5 Tiers, 14 Questions)**: Users answer questions about:
   - **Tier 1 - Core Functional Needs**: Seats, cargo, terrain, towing, luxury vs mainstream
   - **Tier 2 - Usage Pattern**: Daily driving, trips per week, trip duration, average speed
   - **Tier 3 - Ownership Structure**: Buy, lease, or rent
   - **Tier 4 - Financial Constraints**: Price range, monthly fuel budget
   - **Tier 5 - Ownership Priorities**: Drag-and-drop ranking of 6 categories (storage, driving, comfort, tech, owner costs, style)

2. **Data Processing**: User responses collected in `answers` object and formatted as JSON with priority rankings

3. **Claude AI Integration**: JSON sent to Claude Sonnet 4.5 via Anthropic API:
   - Interprets user requirements and priorities
   - Searches Edmunds.com, KBB, and other automotive sources
   - Returns 5-10 vehicles with category-based scores (0-10 scale)
   - Includes pricing, fuel costs, pros/cons, and data source attribution

4. **Intelligent Ranking**: Backend calculates fit scores using `ranking.py` algorithm:
   - Formula: `sum(score × (7 - userPriority)) / 21.0`
   - Higher priority categories (rank 1) weighted more heavily
   - Vehicles sorted by fit score (highest = best match)

5. **Results**: Ranked list with fit scores, category breakdowns, and recommendations

## Technology Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.2
- **Routing**: react-router-dom 7.9.6
- **Language**: JavaScript/JSX
- **State Management**: React Hooks only (useState, useEffect)
- **UI**: Custom quiz interface with drag-and-drop priority ranking

### Backend (Implemented)
- **Framework**: FastAPI
- **Language**: Python 3.12
- **LLM**: Claude Sonnet 4.5 (Anthropic API)
- **Validation**: Pydantic v2
- **Key Components**:
  - API endpoints for recommendations
  - Claude AI integration service
  - User-priority-based scoring algorithm
  - Request/response validation

### External Integrations
- **LLM Provider**: Anthropic (Claude Sonnet 4.5)
- **Data Sources**: Edmunds.com, KBB, GasBuddy (via Claude)

## Project Structure

```
carly/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx          # Router configuration
│   │   ├── main.jsx         # Entry point
│   │   └── pages/
│   │       ├── landingpage.jsx
│   │       ├── quizpage.jsx    # 5-tier questionnaire (1,135 lines)
│   │       ├── resultpage.jsx  # Results display (stub)
│   │       └── navbar.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .env                 # VITE_API_URL
├── backend/                 # FastAPI backend
│   ├── main.py             # FastAPI app with CORS, error handling
│   ├── models/
│   │   └── schemas.py      # Pydantic models (request/response)
│   ├── routes/
│   │   └── recommendations.py  # POST /api/recommendations
│   ├── services/
│   │   ├── claude_service.py   # Anthropic API integration
│   │   └── scoring_service.py  # Fit score calculation
│   ├── utils/
│   │   ├── config.py       # Environment configuration
│   │   └── ranking.py      # get_fit_score() algorithm
│   ├── requirements.txt
│   ├── .env                # ANTHROPIC_API_KEY, CORS_ORIGINS
│   └── test_request.json   # Sample request
├── ranking.py              # Original ranking algorithm
└── CLAUDE.md              # This file
```

## Key Features

### Questionnaire System (Frontend)
- **5-tier progressive questionnaire** with 14 questions
- **Conditional logic**: tripsPerWeek hidden if driveDaily="yes"
- **Drag-and-drop priority ranking** for 6 categories
- **Custom input options** for price and fuel budgets
- **Real-time validation** before enabling Next/Finish buttons
- **Mobile-responsive** design

### Claude AI Integration (Backend)
- **Model**: claude-sonnet-4-5-20250929
- **Comprehensive prompting** with user priorities and requirements
- **Category-based scoring**: 6 categories rated 0-10
  - A_storage: Cargo space, seating, storage
  - B_driving: Performance, handling, dynamics
  - C_comfort: Ride quality, interior comfort
  - D_tech: Infotainment, driver aids
  - E_owner: Reliability, maintenance costs, resale
  - F_style: Exterior/interior aesthetics
- **Budget enforcement**: Price and fuel cost constraints
- **Data source attribution**: KBB, Edmunds, GasBuddy

### Ranking Algorithm (ranking.py)
```python
def get_fit_score(user_rank, car_scores):
    totalScore = 0
    for letter, score in car_scores:
        userPriority = user_rank[letter]
        totalScore += (score * (7 - userPriority))
    return totalScore / 21.0
```

**How it works:**
- User priorities: 1-6 (1 = most important)
- Weight: `(7 - priority)` → Priority 1 = 6×, Priority 6 = 1×
- Normalized by dividing by 21.0
- Result: Fit score 0-10

**Example:**
- User ranks A_storage as #1 (highest priority)
- Car scores 8.5 for A_storage
- Component: `8.5 × (7-1) / 21 = 2.43`

### Results Format
```json
{
  "session_id": "uuid",
  "recommendations": [
    {
      "rank": 1,
      "make_model_year": "2025 Kia Sportage",
      "avg_msrp_usd": 34500,
      "monthly_energy_cost_usd": 96,
      "scores": {
        "A_storage": 8.5,
        "B_driving": 6.5,
        "C_comfort": 7.8,
        "D_tech": 8.2,
        "E_owner": 7.0,
        "F_style": 8.8
      },
      "fit_score": 8.0,
      "pros": ["Stylish interior", "Huge cargo space", "Strong tech"],
      "cons": ["Leisurely acceleration"],
      "data_sources": {
        "price": "KBB",
        "fuel_cost": "KBB MPG + GasBuddy",
        "ratings": "Edmunds"
      }
    }
  ],
  "total_found": 5,
  "message": "Found 5 vehicle recommendations..."
}
```

## Development Status

### ✅ Completed
- React + Vite frontend with full quiz implementation
- FastAPI backend with Pydantic validation
- Claude Sonnet 4.5 integration
- User-priority-based ranking algorithm
- Frontend-backend integration via fetch API
- CORS configuration
- Error handling and validation logging
- Test request examples

### 🚧 In Progress
- Results page UI (currently stub)
- Navigation to results after API response

### 📋 Planned Features
- Results page with vehicle cards
- Side-by-side vehicle comparison
- Save/share recommendations
- User authentication
- Saved preferences
- Dealer inventory integration

## Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.12+ (for backend)
- Anthropic API key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173/quiz`

**Environment (.env):**
```env
VITE_API_URL=http://localhost:8000
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API available at `http://localhost:8000`

**Environment (.env):**
```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
DEBUG=True
WEIGHT_EDMUNDS=0.30
WEIGHT_CONSUMER=0.20
WEIGHT_SAFETY=0.30
WEIGHT_VALUE=0.20
```

## API Endpoints

### POST /api/recommendations

Submit questionnaire and receive ranked vehicle recommendations.

**Request:**
```json
{
  "seats": "6-7",
  "cargo": "5-6",
  "terrain": "snow",
  "towing": "medium",
  "luxuryBrand": "mainstream",
  "driveDaily": "no",
  "tripsPerWeek": "5-7",
  "tripMinutes": "45-60",
  "avgSpeed": 55,
  "ownershipMode": "rent",
  "price_min": 35000,
  "price_max": 50000,
  "fuel_min": 200,
  "fuel_max": 300,
  "priority_order": ["A_storage", "B_driving", "C_comfort", "D_tech", "E_owner", "F_style"],
  "priority_ranks": {
    "A_storage": 1,
    "B_driving": 2,
    "C_comfort": 3,
    "D_tech": 4,
    "E_owner": 5,
    "F_style": 6
  }
}
```

**Note**: `tripsPerWeek` is optional (omitted when `driveDaily="yes"`)

**Response**: See Results Format above

### GET /health

Health check endpoint.

### GET /

API information and status.

## Frontend-Backend Integration

**Flow:**
1. User completes quiz → clicks "Finish"
2. `handleNext()` in quizpage.jsx collects `finalAnswers`
3. `fetch()` POST to `/api/recommendations`
4. Backend validates with Pydantic
5. Claude service calls Anthropic API
6. Scoring service calculates fit scores using `ranking.py`
7. Response returned to frontend
8. Console logs recommendations (UI display pending)

**Current Implementation (quizpage.jsx lines 468-483):**
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
fetch(`${apiUrl}/api/recommendations`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(finalAnswers)
})
  .then(res => res.json())
  .then(data => {
    console.log("Recommendations:", data);
    alert(`Success! Received ${data.total_found} recommendations.`);
  })
  .catch(err => {
    console.error("API Error:", err);
    alert("Error getting recommendations.");
  });
```

## Testing

### Manual Testing

**Frontend:**
1. Visit `http://localhost:5173/quiz`
2. Complete all 14 questions
3. Drag-and-drop priority ranking
4. Click "Finish"
5. Check console for "Recommendations:"

**Backend:**
```bash
curl -X POST http://localhost:8000/api/recommendations \
  -H "Content-Type: application/json" \
  -d @test_request.json
```

**Check Logs:**
- Backend should log validation success
- Claude API call with model name
- Number of vehicles found
- Fit score calculations
- Top ranked vehicle

## Troubleshooting

### 422 Validation Error
- Check `tripsPerWeek` is omitted when `driveDaily="yes"`
- Verify all required fields present
- Check backend logs for specific validation errors

### CORS Error
- Ensure `CORS_ORIGINS` includes frontend URL
- Backend should allow `http://localhost:5173`

### Claude API Error
- Verify `ANTHROPIC_API_KEY` in backend `.env`
- Check API key has credits
- Review Claude API status

### No Results Displayed
- Results page UI not yet implemented
- Check browser console for recommendations
- Verify API response in Network tab

## Architecture Decisions

### Why Claude Sonnet 4.5?
- Superior reasoning for interpreting user priorities
- Excellent JSON output formatting
- Ability to search and synthesize automotive data
- Cost-effective for this use case

### Why Custom Ranking Algorithm?
- User priorities directly influence weights
- Transparent, explainable scoring
- Simple formula easy to understand and debug
- Aligns with user's drag-and-drop ranking

### Why Minimal Frontend Changes?
- Preserve existing quiz implementation
- Reduce testing burden
- Single fetch() call for integration
- Easy to extend with results page later

## Future Enhancements

- **Results Page**: Full UI for displaying ranked vehicles
- **Vehicle Comparison**: Side-by-side comparison tool
- **Saved Searches**: User authentication and saved preferences
- **Real-time Pricing**: Live dealer inventory integration
- **Mobile App**: Native iOS/Android versions
- **A/B Testing**: Optimize questionnaire flow
- **Analytics**: Track user preferences and trends

## Contributing

This is a personal project. See repository for contribution guidelines.

## License

[To be determined]

---

**Project Status**: Active Development
**Last Updated**: November 2025
**Backend**: Fully functional with Claude integration
**Frontend**: Quiz complete, results page pending
