"""
Claude/Anthropic API integration service
Handles communication with Claude for Edmunds.com vehicle search
"""

import json
import logging
from typing import Dict, Any
from anthropic import Anthropic
from models.schemas import UserPreferencesRequest, ClaudeSearchResponse
from utils.config import settings

logger = logging.getLogger(__name__)


class ClaudeService:
    """Service for interacting with Claude API"""

    def __init__(self):
        self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.model = "claude-sonnet-4-5-20250929"

    def build_search_prompt(self, user_data: UserPreferencesRequest) -> str:
        """
        Build a structured prompt for Claude to search Edmunds.com

        Args:
            user_data: User preferences and requirements

        Returns:
            Formatted prompt string
        """
        user_json = json.dumps(user_data.model_dump(), indent=2)

        prompt = f"""You are an expert automotive consultant with access to Edmunds.com vehicle database.

A user is looking for car recommendations based on the following comprehensive questionnaire responses:

{user_json}

Interpret these responses:

**Vehicle Requirements:**
- seats: Number of seats needed (e.g., "6-7" means 6-7 passenger capacity)
- cargo: Cargo space requirement (1-10 scale, "5-6" means above average cargo space)
- terrain: Primary terrain type (e.g., "snow" requires AWD/4WD)
- towing: Towing capability (e.g., "medium" means 3,500-7,000 lbs capacity)
- luxuryBrand: Brand preference ("luxury" = premium brands, "mainstream" = non-luxury brands)

**Usage Patterns:**
- driveDaily: Whether this is a daily driver ("yes" or "no")
- tripsPerWeek: Frequency of use (e.g., "5-7" means 5-7 trips per week)
- tripMinutes: Average trip duration (e.g., "45-60" means 45-60 minute trips)
- avgSpeed: Average driving speed in mph (indicates city vs highway use)

**Budget & Ownership:**
- ownershipMode: How they plan to acquire ("rent", "buy", "lease")
- price_min / price_max: Budget range in USD
- fuel_min / fuel_max: Monthly fuel budget in USD (consider fuel efficiency accordingly)

**Priorities (ranked 1-6, 1 = highest priority):**
- A_storage: Cargo and storage space
- B_driving: Driving performance and handling
- C_comfort: Ride comfort and interior quality
- D_tech: Technology and infotainment
- E_owner: Ownership costs and reliability
- F_style: Exterior styling and aesthetics

Use the priority_ranks to weight your recommendations toward what matters most to the user.

Based on these requirements, search Edmunds.com for vehicles that match and return your findings in the following JSON format:

{{
  "vehicles": [
    {{
      "make": "Toyota",
      "model": "Camry",
      "year": 2024,
      "trim": "XLE",
      "price": 32000,
      "edmunds_url": "https://www.edmunds.com/toyota/camry/",
      "scores": {{
        "edmunds_rating": 8.5,
        "consumer_rating": 8.7,
        "safety_score": 9.0,
        "value_rating": 8.3
      }},
      "description": "Reliable midsize sedan with excellent fuel economy",
      "why_recommended": "Matches budget, excellent safety ratings, and hybrid option available for fuel efficiency"
    }}
  ],
  "search_summary": "Found 5 vehicles matching the criteria within budget range"
}}

Important instructions:
1. Find 5-10 vehicles that best match the user's requirements
2. All scores should be on a scale of 0-10
3. Include actual Edmunds ratings, consumer ratings, safety scores, and value ratings
4. Provide real vehicles that are currently available or recent models (2023-2025)
5. Ensure prices are within the specified budget range (price_min to price_max)
6. Consider the monthly fuel budget when recommending vehicles (prioritize fuel-efficient options if budget is low)
7. Weight your recommendations based on the user's priority_ranks (rank 1 = most important)
8. Include a brief explanation of why each vehicle is recommended, referencing their top priorities
9. For ownership mode "rent", focus on popular rental-friendly vehicles
10. Return ONLY the JSON object, no additional text

Begin your search and return the results in JSON format."""

        return prompt

    async def search_vehicles(self, user_data: UserPreferencesRequest) -> ClaudeSearchResponse:
        """
        Call Claude API to search for vehicles on Edmunds.com

        Args:
            user_data: User preferences from questionnaire

        Returns:
            ClaudeSearchResponse with vehicle data and scores

        Raises:
            Exception: If API call fails or response is invalid
        """
        try:
            prompt = self.build_search_prompt(user_data)

            logger.info(f"Calling Claude API with model {self.model}")

            # Call Claude API
            message = self.client.messages.create(
                model=self.model,
                max_tokens=4000,
                temperature=0.7,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )

            # Extract response text
            response_text = message.content[0].text
            logger.info(f"Received response from Claude API")
            logger.debug(f"Response: {response_text}")

            # Parse JSON response
            try:
                # Handle potential markdown code blocks
                if "```json" in response_text:
                    response_text = response_text.split("```json")[1].split("```")[0].strip()
                elif "```" in response_text:
                    response_text = response_text.split("```")[1].split("```")[0].strip()

                response_data = json.loads(response_text)

                # Validate and parse with Pydantic
                claude_response = ClaudeSearchResponse(**response_data)

                logger.info(f"Successfully parsed {len(claude_response.vehicles)} vehicles")
                return claude_response

            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON response: {e}")
                logger.error(f"Response text: {response_text}")
                raise Exception(f"Invalid JSON response from Claude: {str(e)}")

        except Exception as e:
            logger.error(f"Error calling Claude API: {str(e)}")
            raise Exception(f"Failed to get vehicle recommendations: {str(e)}")


# Singleton instance
claude_service = ClaudeService()
