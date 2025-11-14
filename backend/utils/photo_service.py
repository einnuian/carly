"""
Auto.dev API integration for vehicle photos
"""

import logging
import requests
from typing import Optional

logger = logging.getLogger(__name__)


def fetch_vehicle_vin(make: str, model: str, year: str, api_key: str) -> str:
    """
    Fetch a VIN from Auto.dev API based on make, model, and year.

    Args:
        make: Vehicle make (e.g., "Toyota")
        model: Vehicle model (e.g., "Camry")
        year: Vehicle year (e.g., "2020")
        api_key: Auto.dev API key

    Returns:
        VIN string if found, otherwise empty string
    """
    if not make or not model or not year:
        return ""

    try:
        # Auto.dev Vehicle Listings API endpoint
        search_url = "https://api.auto.dev/listings"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        params = {
            "vehicle.make": make,
            "vehicle.model": model,
            "vehicle.year": year,
            "limit": 1  # Get the first result
        }

        response = requests.get(search_url, headers=headers, params=params, timeout=5)
        response.raise_for_status()

        data = response.json()
        # Response has a "data" array with listing objects containing VIN
        listings = data.get("data", [])
        if listings:
            return listings[0].get("vin", "")

        return ""

    except Exception as e:
        logger.warning(f"Failed to fetch VIN for {make} {model} {year}: {str(e)}")
        return ""


def fetch_vehicle_photos(vin: str, api_key: str) -> Optional[str]:
    """
    Fetch vehicle photos from Auto.dev API for a given VIN.

    Args:
        vin: 17-character Vehicle Identification Number
        api_key: Auto.dev API key

    Returns:
        First photo URL, or None if none found or error occurred
    """
    if not vin or len(vin) != 17:
        logger.warning(f"Invalid VIN format for photo fetch: {vin}")
        return None

    try:
        photos_url = f"https://api.auto.dev/photos/{vin}"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        response = requests.get(photos_url, headers=headers, timeout=5)
        response.raise_for_status()

        data = response.json()
        photos = data.get("data", {}).get("retail", [])

        if photos:
            logger.info(f"Fetched photo for VIN {vin}")
            return photos[0]

        return None

    except Exception as e:
        logger.warning(f"Failed to fetch photos for VIN {vin}: {str(e)}")
        return None


def get_vehicle_photo(make_model_year: str, api_key: str) -> Optional[str]:
    """
    Get vehicle photo URL from make_model_year string.

    Args:
        make_model_year: Combined string like "2025 Kia Sportage"
        api_key: Auto.dev API key

    Returns:
        Photo URL or None if not found
    """
    if not make_model_year or not api_key:
        return None

    try:
        # Parse make_model_year: "2025 Kia Sportage" -> year="2025", make="Kia", model="Sportage"
        parts = make_model_year.strip().split()
        if len(parts) < 3:
            logger.warning(f"Invalid make_model_year format: {make_model_year}")
            return None

        year = parts[0]
        make = parts[1]
        model = " ".join(parts[2:])  # Handle multi-word models like "Grand Cherokee"

        logger.info(f"Fetching photo for {year} {make} {model}")

        # Step 1: Get VIN
        vin = fetch_vehicle_vin(make, model, year, api_key)
        if not vin:
            logger.warning(f"No VIN found for {year} {make} {model}")
            return None

        # Step 2: Get photo using VIN
        photo_url = fetch_vehicle_photos(vin, api_key)
        return photo_url

    except Exception as e:
        logger.error(f"Error getting photo for {make_model_year}: {str(e)}")
        return None
