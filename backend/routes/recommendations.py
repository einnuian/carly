"""
API routes for car recommendations
"""

import uuid
import logging
from fastapi import APIRouter, HTTPException
from models.schemas import (
    UserPreferencesRequest,
    RecommendationResponse,
    ErrorResponse
)
from services.claude_service import claude_service
from services.scoring_service import scoring_service

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/recommendations", response_model=RecommendationResponse)
async def get_recommendations(user_data: UserPreferencesRequest):
    """
    Main endpoint: Receive user preferences, call Claude, calculate scores, return ranked results

    Flow:
    1. Receive JSON from frontend with user preferences
    2. Call Claude API to search Edmunds.com for matching vehicles
    3. Calculate weighted scores for each vehicle
    4. Rank vehicles by score
    5. Return recommendations to frontend

    Args:
        user_data: User preferences from questionnaire

    Returns:
        RecommendationResponse with ranked vehicles
    """
    session_id = str(uuid.uuid4())

    try:
        logger.info(f"[{session_id}] Received recommendation request")
        logger.info(f"[{session_id}] Validated user data successfully")
        logger.debug(f"[{session_id}] User data: {user_data.model_dump()}")

        # Step 1: Call Claude to search Edmunds.com
        logger.info(f"[{session_id}] Calling Claude API to search for vehicles")
        claude_response = await claude_service.search_vehicles(user_data)

        if not claude_response.vehicles:
            logger.warning(f"[{session_id}] No vehicles found")
            raise HTTPException(
                status_code=404,
                detail="No vehicles found matching your criteria. Please adjust your preferences."
            )

        logger.info(f"[{session_id}] Found {len(claude_response.vehicles)} vehicles")

        # Step 2: Calculate weighted scores and rank vehicles using user priorities
        logger.info(f"[{session_id}] Calculating weighted scores based on user priorities")
        scored_vehicles = scoring_service.rank_vehicles(
            claude_response.vehicles,
            user_data.priority_ranks
        )

        # Step 3: Build response
        response = RecommendationResponse(
            session_id=session_id,
            recommendations=scored_vehicles,
            total_found=len(scored_vehicles),
            message=f"Found {len(scored_vehicles)} vehicle recommendations based on your preferences"
        )

        logger.info(f"[{session_id}] Successfully generated recommendations")
        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"[{session_id}] Error generating recommendations: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate recommendations: {str(e)}"
        )


@router.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "service": "recommendations"}
