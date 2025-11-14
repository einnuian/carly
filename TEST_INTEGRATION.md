# Quick Integration Test Guide

## Start Both Servers

**Terminal 1 - Backend:**
```bash
cd /home/ein/Projects/carly/backend
source venv/bin/activate
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd /home/ein/Projects/carly/frontend
npm run dev
```

## Test the Flow

1. Open browser: `http://localhost:5173/quiz`
2. Complete all quiz questions
3. Click "Finish" on last step
4. Open browser console (F12)
5. Look for:
   - `Quiz answers: {...}` - your input
   - `Recommendations: {...}` - backend response
6. Alert should show: "Success! Received X recommendations..."

## Expected Console Output

```javascript
Quiz answers: {
  seats: "6-7",
  cargo: "5-6",
  terrain: "snow",
  towing: "medium",
  luxuryBrand: "mainstream",
  driveDaily: "no",
  tripsPerWeek: "5-7",
  tripMinutes: "45-60",
  avgSpeed: 55,
  ownershipMode: "rent",
  price_min: 35000,
  price_max: 50000,
  fuel_min: 200,
  fuel_max: 300,
  priority_order: [...],
  priority_ranks: {...}
}

Recommendations: {
  session_id: "123e4567-e89b-12d3-a456-426614174000",
  recommendations: [
    {
      rank: 1,
      make_model_year: "2025 Kia Sportage",
      avg_msrp_usd: 34500,
      monthly_energy_cost_usd: 96,
      scores: {
        A_storage: 8.5,
        B_drive: 6.5,
        C_comfort: 7.8,
        D_tech: 8.2,
        E_owner: 7.0,
        F_style: 8.8
      },
      fit_score: 8.0,
      pros: ["Stylish interior", "Huge cargo space", "Strong tech"],
      cons: ["Leisurely acceleration"],
      data_sources: {
        price: "KBB",
        fuel_cost: "KBB MPG + GasBuddy",
        ratings: "Edmunds"
      }
    }
    // ... more vehicles
  ],
  total_found: 5,
  message: "Found 5 vehicle recommendations..."
}
```

## Verify Backend Logs

Backend terminal should show:
```
INFO:     127.0.0.1:XXXXX - "POST /api/recommendations HTTP/1.1" 200 OK
INFO:     [session-id] Received recommendation request
INFO:     [session-id] Calling Claude API to search for vehicles
INFO:     Calling Claude API with model claude-sonnet-4-5-20250929
INFO:     [session-id] Found 5 vehicles
INFO:     [session-id] Calculating weighted scores based on user priorities
INFO:     Ranked 5 vehicles
INFO:     Top vehicle: 2025 Kia Sportage with fit score 8.0
```

## Troubleshooting

### CORS Error
**Problem:** Console shows "CORS policy" error

**Solution:** Check `backend/.env`:
```env
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Connection Refused
**Problem:** `Failed to fetch`

**Solution:**
- Check backend is running on port 8000
- Check `frontend/.env` has `VITE_API_URL=http://localhost:8000`

### 422 Validation Error
**Problem:** Backend returns 422 Unprocessable Entity

**Solution:**
- Check all quiz fields are filled
- Verify `priority_ranks` is present in finalAnswers
- Check backend logs for validation errors

### Claude API Error
**Problem:** Backend logs show Anthropic API error

**Solution:**
- Check `backend/.env` has valid `ANTHROPIC_API_KEY`
- Verify API key has credits
- Check internet connection

## Success Criteria

✅ Backend starts without errors
✅ Frontend loads quiz page
✅ Can complete all quiz questions
✅ "Finish" button works
✅ Console shows "Quiz answers"
✅ Console shows "Recommendations"
✅ Alert shows success message
✅ Backend logs show successful API call
✅ Recommendations include rank and fit_score

## Next: Display Results in UI

Once working, update line 1250 in `quizpage.jsx`:
```javascript
.then(data => {
  console.log("Recommendations:", data);
  // Navigate to results page
  window.location.href = `/results?recommendations=${encodeURIComponent(JSON.stringify(data))}`;
})
```

Then update `resultpage.jsx` to parse and display the recommendations.
