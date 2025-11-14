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


class CategoryScores(BaseModel):
    """Category-based scores aligned with user priorities"""
    A_storage: float = Field(..., ge=0, le=10, description="Storage capacity score")
    B_driving: float = Field(..., ge=0, le=10, description="Driving performance score")
    C_comfort: float = Field(..., ge=0, le=10, description="Comfort score")
    D_tech: float = Field(..., ge=0, le=10, description="Technology score")
    E_owner: float = Field(..., ge=0, le=10, description="Ownership costs score")
    F_style: float = Field(..., ge=0, le=10, description="Style score")


class DataSources(BaseModel):
    """Sources for vehicle data"""
    price: str = Field(..., description="Price data source (e.g., 'KBB')")
    fuel_cost: str = Field(..., description="Fuel cost data source")
    ratings: str = Field(..., description="Ratings data source (e.g., 'Edmunds')")


class VehicleData(BaseModel):
    """Vehicle information from Claude search"""
    make_model_year: str = Field(..., description="Combined vehicle identifier (e.g., '2025 Kia Sportage')")
    avg_msrp_usd: int = Field(..., ge=0, description="Average MSRP in USD")
    monthly_energy_cost_usd: int = Field(..., ge=0, description="Estimated monthly fuel/energy cost in USD")
    scores: CategoryScores = Field(..., description="Category-based scores")
    pros: List[str] = Field(default=[], description="Key advantages")
    cons: List[str] = Field(default=[], description="Notable drawbacks")
    data_sources: DataSources = Field(..., description="Data source attribution")


class RankedVehicle(BaseModel):
    """Vehicle with rank and fit score added"""
    rank: int = Field(..., description="Ranking position (1 = best match)")
    make_model_year: str
    avg_msrp_usd: int
    monthly_energy_cost_usd: int
    scores: CategoryScores
    fit_score: float = Field(..., description="Calculated fit score based on user priorities")
    pros: List[str]
    cons: List[str]
    data_sources: DataSources


class ClaudeSearchResponse(BaseModel):
    """Expected response format from Claude"""
    vehicles: List[VehicleData]
    search_summary: Optional[str] = None


class ScoredVehicle(BaseModel):
    """Vehicle with calculated weighted score (kept for internal use)"""
    rank: int
    vehicle: VehicleData
    weighted_score: float = Field(..., description="Calculated weighted average score")
    score_breakdown: Dict[str, float] = Field(..., description="Individual score components")


class RecommendationResponse(BaseModel):
    """Final response to frontend"""
    session_id: str
    recommendations: List[RankedVehicle]
    total_found: int
    message: str


class ErrorResponse(BaseModel):
    """Error response"""
    error: str
    detail: Optional[str] = None
