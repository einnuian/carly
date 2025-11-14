"""
Scoring service for calculating weighted averages
Ranks vehicles based on category scores and user priorities
Uses functions from utils/ranking.py
"""

import logging
from typing import List, Dict
from models.schemas import VehicleData, RankedVehicle
from utils.ranking import get_fit_score

logger = logging.getLogger(__name__)


class ScoringService:
    """Service for calculating weighted vehicle scores based on user priorities"""

    def calculate_weighted_score(
        self,
        vehicle: VehicleData,
        priority_ranks: Dict[str, int]
    ) -> Dict[str, float]:
        """
        Calculate weighted average score for a single vehicle based on user priorities

        Uses the get_fit_score function from ranking.py which implements:
        - totalScore = sum(score * (7 - userPriority)) for each category
        - final_score = totalScore / 21.0

        Where userPriority ranges from 1-6 (1 = highest priority)

        Args:
            vehicle: Vehicle data with category scores
            priority_ranks: User's priority rankings (e.g., {"A_storage": 1, "B_driving": 2, ...})

        Returns:
            Dictionary with weighted_score and breakdown
        """
        scores = vehicle.scores

        # Convert CategoryScores to list of tuples for get_fit_score
        # get_fit_score expects: [(letter, score), ...]
        car_scores = [
            ("A_storage", scores.A_storage),
            ("B_driving", scores.B_driving),
            ("C_comfort", scores.C_comfort),
            ("D_tech", scores.D_tech),
            ("E_owner", scores.E_owner),
            ("F_style", scores.F_style),
        ]

        # Calculate weighted score using ranking.py function
        weighted_score = get_fit_score(priority_ranks, car_scores)

        # Calculate individual components for breakdown
        breakdown = {}
        for letter, score in car_scores:
            user_priority = priority_ranks.get(letter, 3)  # Default to middle priority
            component_score = score * (7 - user_priority) / 21.0
            breakdown[f"{letter}_component"] = round(component_score, 2)

        breakdown["total"] = round(weighted_score, 2)
        breakdown["priority_ranks_used"] = priority_ranks

        return {
            "weighted_score": round(weighted_score, 2),
            "breakdown": breakdown
        }

    def rank_vehicles(
        self,
        vehicles: List[VehicleData],
        priority_ranks: Dict[str, int]
    ) -> List[RankedVehicle]:
        """
        Calculate scores and rank all vehicles based on user priorities

        Args:
            vehicles: List of vehicles from Claude search
            priority_ranks: User's priority rankings

        Returns:
            List of RankedVehicle objects with fit_score and rank, sorted by rank (highest score first)
        """
        if not vehicles:
            return []

        # Calculate scores for each vehicle and store with vehicle data
        vehicle_scores = []
        for vehicle in vehicles:
            score_data = self.calculate_weighted_score(vehicle, priority_ranks)
            vehicle_scores.append({
                "vehicle": vehicle,
                "fit_score": score_data["weighted_score"]
            })

        # Sort by fit_score (descending)
        vehicle_scores.sort(key=lambda x: x["fit_score"], reverse=True)

        # Create RankedVehicle objects with rank and fit_score
        ranked_vehicles = []
        for idx, item in enumerate(vehicle_scores, start=1):
            vehicle = item["vehicle"]
            fit_score = item["fit_score"]

            ranked_vehicle = RankedVehicle(
                rank=idx,
                make_model_year=vehicle.make_model_year,
                avg_msrp_usd=vehicle.avg_msrp_usd,
                monthly_energy_cost_usd=vehicle.monthly_energy_cost_usd,
                scores=vehicle.scores,
                fit_score=fit_score,
                pros=vehicle.pros,
                cons=vehicle.cons,
                data_sources=vehicle.data_sources,
                photo_url=vehicle.photo_url
            )
            ranked_vehicles.append(ranked_vehicle)

        logger.info(f"Ranked {len(ranked_vehicles)} vehicles")
        if ranked_vehicles:
            top = ranked_vehicles[0]
            logger.info(f"Top vehicle: {top.make_model_year} "
                       f"with fit score {top.fit_score}")

        return ranked_vehicles


# Singleton instance
scoring_service = ScoringService()
