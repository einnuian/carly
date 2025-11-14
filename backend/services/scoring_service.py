"""
Scoring service for calculating weighted averages
Ranks vehicles based on Edmunds scores
"""

import logging
from typing import List, Dict
from models.schemas import VehicleData, ScoredVehicle
from utils.config import settings

logger = logging.getLogger(__name__)


class ScoringService:
    """Service for calculating weighted vehicle scores"""

    def __init__(self):
        self.weights = {
            "edmunds_rating": settings.WEIGHT_EDMUNDS,
            "consumer_rating": settings.WEIGHT_CONSUMER,
            "safety_score": settings.WEIGHT_SAFETY,
            "value_rating": settings.WEIGHT_VALUE
        }
        logger.info(f"Scoring weights: {self.weights}")

    def calculate_weighted_score(self, vehicle: VehicleData) -> Dict[str, float]:
        """
        Calculate weighted average score for a single vehicle

        Args:
            vehicle: Vehicle data with Edmunds scores

        Returns:
            Dictionary with weighted_score and breakdown
        """
        scores = vehicle.scores

        # Calculate individual weighted components
        weighted_edmunds = scores.edmunds_rating * self.weights["edmunds_rating"]
        weighted_consumer = scores.consumer_rating * self.weights["consumer_rating"]
        weighted_safety = scores.safety_score * self.weights["safety_score"]
        weighted_value = scores.value_rating * self.weights["value_rating"]

        # Calculate total weighted score
        total_score = (
            weighted_edmunds +
            weighted_consumer +
            weighted_safety +
            weighted_value
        )

        breakdown = {
            "edmunds_component": round(weighted_edmunds, 2),
            "consumer_component": round(weighted_consumer, 2),
            "safety_component": round(weighted_safety, 2),
            "value_component": round(weighted_value, 2),
            "total": round(total_score, 2)
        }

        return {
            "weighted_score": round(total_score, 2),
            "breakdown": breakdown
        }

    def rank_vehicles(self, vehicles: List[VehicleData]) -> List[ScoredVehicle]:
        """
        Calculate scores and rank all vehicles

        Args:
            vehicles: List of vehicles from Claude search

        Returns:
            List of ScoredVehicle objects, sorted by rank (highest score first)
        """
        if not vehicles:
            return []

        scored_vehicles = []

        # Calculate scores for each vehicle
        for vehicle in vehicles:
            score_data = self.calculate_weighted_score(vehicle)

            scored_vehicle = ScoredVehicle(
                rank=0,  # Will be set after sorting
                vehicle=vehicle,
                weighted_score=score_data["weighted_score"],
                score_breakdown=score_data["breakdown"]
            )
            scored_vehicles.append(scored_vehicle)

        # Sort by weighted score (descending)
        scored_vehicles.sort(key=lambda x: x.weighted_score, reverse=True)

        # Assign ranks
        for idx, scored_vehicle in enumerate(scored_vehicles, start=1):
            scored_vehicle.rank = idx

        logger.info(f"Ranked {len(scored_vehicles)} vehicles")
        logger.info(f"Top vehicle: {scored_vehicles[0].vehicle.make} {scored_vehicles[0].vehicle.model} "
                   f"with score {scored_vehicles[0].weighted_score}")

        return scored_vehicles


# Singleton instance
scoring_service = ScoringService()
