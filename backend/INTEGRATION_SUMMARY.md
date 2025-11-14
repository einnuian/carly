# Backend Integration Complete

## Summary of Changes

### 1. JSON Format Updated

**Input (from frontend):**
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

**Output (to frontend):**
```json
{
  "session_id": "uuid-string",
  "recommendations": [
    {
      "rank": 1,
      "make_model_year": "2025 Kia Sportage",
      "avg_msrp_usd": 34500,
      "monthly_energy_cost_usd": 96,
      "scores": {
        "A_storage": 8.5,
        "B_drive": 6.5,
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

### 2. Ranking Algorithm Integration

**File:** `backend/utils/ranking.py`

```python
def get_fit_score(user_rank, car_scores):
    totalScore = 0
    for letter, score in car_scores:
        userPriority = user_rank[letter]
        totalScore += (score * (7 - userPriority))
    
    return totalScore / 21.0
```

**How it works:**
- User priorities: 1-6 (1 = highest priority)
- Higher priority categories get more weight: `(7 - priority)`
- Formula: `sum(category_score × (7 - priority)) / 21.0`
- Result: Fit score between 0-10

**Example:**
- User ranks A_storage as priority 1 (most important)
- Car scores 8.5 for A_storage
- Weighted component: `8.5 × (7 - 1) / 21.0 = 8.5 × 6 / 21.0 = 2.43`

### 3. Updated Backend Components

**schemas.py:**
- `CategoryScores`: A_storage, B_drive, C_comfort, D_tech, E_owner, F_style
- `VehicleData`: Data from Claude (without rank/fit_score)
- `RankedVehicle`: Final output with rank and fit_score

**scoring_service.py:**
- Uses `get_fit_score()` from ranking.py
- Calculates fit_score for each vehicle
- Sorts by fit_score descending
- Returns list of `RankedVehicle` objects

**claude_service.py:**
- Updated prompt to request new JSON format
- Instructions for category-based scoring
- Requests real data from KBB, Edmunds, GasBuddy

**recommendations.py (routes):**
- Receives user questionnaire
- Calls Claude API
- Passes `priority_ranks` to scoring service
- Returns ranked vehicles with fit_scores

### 4. Frontend Status

**No changes made to frontend** - as requested, all frontend changes were reversed.

The frontend quiz already collects all required data in the correct format. When ready to integrate:
1. Frontend POSTs to `/api/recommendations` with questionnaire data
2. Backend returns ranked vehicles with fit_scores
3. Frontend displays results

### 5. Testing

**Test the API:**
```bash
curl -X POST http://localhost:8000/api/recommendations \
  -H "Content-Type: application/json" \
  -d @test_request.json
```

**Expected flow:**
1. Validate request → ✓
2. Call Claude API → Returns 5-10 vehicles with category scores
3. Calculate fit_scores → Uses ranking.py `get_fit_score()`
4. Sort and rank → Assigns ranks 1, 2, 3...
5. Return JSON → Each vehicle has rank and fit_score

### 6. Key Files

```
backend/
├── models/schemas.py          # Updated with RankedVehicle
├── services/
│   ├── claude_service.py      # New JSON format prompt
│   └── scoring_service.py     # Uses ranking.py
├── routes/recommendations.py  # Passes priority_ranks
├── utils/
│   └── ranking.py            # get_fit_score() function
└── test_request.json          # Updated example
```

## Next Steps

1. **Test the endpoint** with the sample data
2. **Verify Claude returns** proper category scores
3. **Check fit_score calculation** matches expected results
4. **Connect frontend** when ready (no backend changes needed)
