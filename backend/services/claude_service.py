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
- tripsPerWeek: Frequency of use (e.g., "5-7" means 5-7 trips per week). NOTE: This field may be omitted if driveDaily="yes" (assume 7 trips/week)
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

Based on these requirements, search Edmunds.com, KBB, and other automotive sources for vehicles that match and return your findings in the following JSON format:

{{
  "vehicles": [
    {{
      "make_model_year": "2025 Kia Sportage",
      "avg_msrp_usd": 34500,
      "monthly_energy_cost_usd": 96,
      "scores": {{
        "A_storage": 8.5,
        "B_driving": 6.5,
        "C_comfort": 7.8,
        "D_tech": 8.2,
        "E_owner": 7.0,
        "F_style": 8.8
      }},
      "pros": ["Stylish interior", "Huge cargo space", "Strong tech"],
      "cons": ["Leisurely acceleration"],
      "data_sources": {{
        "price": "KBB",
        "fuel_cost": "KBB MPG + GasBuddy",
        "ratings": "Edmunds"
      }}
    }}
  ],
  "search_summary": "Found 5 vehicles matching the criteria"
}}

Important instructions:
1. Find 5-10 vehicles that best match the user's requirements
2. All scores should be on a scale of 0-10 for each category:
   - A_storage: Based on cargo space, seating capacity, storage options
   - B_driving: Based on performance, handling, driving dynamics
   - C_comfort: Based on ride quality, interior comfort, noise levels
   - D_tech: Based on infotainment, driver aids, connectivity
   - E_owner: Based on reliability, maintenance costs, resale value
   - F_style: Based on exterior design, interior aesthetics
3. Provide real vehicles that are currently available or recent models (2023-2025)
4. Ensure avg_msrp_usd is within the specified budget range (price_min to price_max)
5. Calculate monthly_energy_cost_usd based on actual MPG/MPGe and current fuel/electricity prices
6. Ensure monthly_energy_cost_usd fits within the fuel_min to fuel_max budget
7. Weight your recommendations based on the user's priority_ranks (rank 1 = most important category)
8. Include 3-5 specific pros and 1-3 honest cons for each vehicle
9. For ownership mode "rent", focus on popular rental-friendly vehicles
10. Cite data sources accurately (KBB for pricing, Edmunds for ratings, etc.)
11. Return ONLY the JSON object, no additional text

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
