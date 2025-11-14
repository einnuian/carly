"""
Pydantic models for request/response validation
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class UserPreferencesRequest(BaseModel):
    """User input from frontend questionnaire"""
    # Basic vehicle requirements
    seats: str = Field(..., description="Number of seats needed (e.g., '6-7')")
    cargo: str = Field(..., description="Cargo space requirement (e.g., '5-6')")
    terrain: str = Field(..., description="Primary terrain type (e.g., 'snow')")
    towing: str = Field(..., description="Towing requirements (e.g., 'medium')")
    luxuryBrand: str = Field(..., description="Luxury brand preference ('luxury' or 'mainstream')")

    # Usage patterns
    driveDaily: str = Field(..., description="Daily driving usage ('yes' or 'no')")
    tripsPerWeek: str = Field(..., description="Number of trips per week (e.g., '5-7')")
    tripMinutes: str = Field(..., description="Average trip duration (e.g., '45-60')")
    avgSpeed: int = Field(..., description="Average speed in mph")

    # Ownership and budget
    ownershipMode: str = Field(..., description="Ownership mode ('rent', 'buy', 'lease')")
    price_min: int = Field(..., ge=0, description="Minimum price in USD")
    price_max: int = Field(..., ge=0, description="Maximum price in USD")

    # Fuel budget
    fuel_min: int = Field(..., ge=0, description="Minimum monthly fuel budget in USD")
    fuel_max: int = Field(..., ge=0, description="Maximum monthly fuel budget in USD")

    # Priority rankings
    priority_order: List[str] = Field(..., description="Ordered list of priority categories")
    priority_ranks: Dict[str, int] = Field(..., description="Priority rankings by category")

    class Config:
        json_schema_extra = {
            "example": {
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
                "priority_order": [
                    "A_storage",
                    "B_driving",
                    "C_comfort",
                    "D_tech",
                    "E_owner",
                    "F_style"
                ],
                "priority_ranks": {
                    "A_storage": 1,
                    "B_driving": 2,
                    "C_comfort": 3,
                    "D_tech": 4,
                    "E_owner": 5,
                    "F_style": 6
                }
            }
        }


class EdmundsScore(BaseModel):
    """Edmunds rating scores returned by Claude"""
    edmunds_rating: float = Field(..., ge=0, le=10)
    consumer_rating: float = Field(..., ge=0, le=10)
    safety_score: float = Field(..., ge=0, le=10)
    value_rating: float = Field(..., ge=0, le=10)


class VehicleData(BaseModel):
    """Vehicle information from Claude/Edmunds search"""
    make: str
    model: str
    year: int
    trim: Optional[str] = None
    price: Optional[int] = None
    edmunds_url: Optional[str] = None
    scores: EdmundsScore
    description: Optional[str] = None
    why_recommended: Optional[str] = None


class ClaudeSearchResponse(BaseModel):
    """Expected response format from Claude"""
    vehicles: List[VehicleData]
    search_summary: Optional[str] = None


class ScoredVehicle(BaseModel):
    """Vehicle with calculated weighted score"""
    rank: int
    vehicle: VehicleData
    weighted_score: float = Field(..., description="Calculated weighted average score")
    score_breakdown: Dict[str, float] = Field(..., description="Individual score components")


class RecommendationResponse(BaseModel):
    """Final response to frontend"""
    session_id: str
    recommendations: List[ScoredVehicle]
    total_found: int
    message: str


class ErrorResponse(BaseModel):
    """Error response"""
    error: str
    detail: Optional[str] = None
