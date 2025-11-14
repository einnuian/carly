# Fixed: Field Name Mismatch

## Problem
Frontend was sending `B_driving` but backend expected `B_drive`, causing 422 validation error.

## Solution
Updated backend to match frontend naming:

### Files Changed:
1. **models/schemas.py** - Changed `B_drive` to `B_driving` in `CategoryScores`
2. **services/scoring_service.py** - Updated reference from `scores.B_drive` to `scores.B_driving`
3. **services/claude_service.py** - Updated JSON example and instructions to use `B_driving`

### Field Names (Frontend → Backend):
```
A_storage  → A_storage  ✓
B_driving  → B_driving  ✓ (was B_drive ✗)
C_comfort  → C_comfort  ✓
D_tech     → D_tech     ✓
E_owner    → E_owner    ✓
F_style    → F_style    ✓
```

## Test Again
The validation error should now be fixed. Try submitting the quiz again.
