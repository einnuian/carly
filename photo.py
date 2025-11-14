import requests

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
        #logger.warning(f"Failed to fetch VIN for {make} {model} {year}: {str(e)}")
        return ""


def fetch_vehicle_photos(vin: str, api_key: str) -> list:
    """
    Fetch vehicle photos from Auto.dev API for a given VIN.

    Args:
        vin: 17-character Vehicle Identification Number
        api_key: Auto.dev API key

    Returns:
        List of photo URLs, or empty list if none found or error occurred
    """
    if not vin or len(vin) != 17:
        #logger.warning(f"Invalid VIN format for photo fetch: {vin}")
        return []

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

        #logger.info(f"Fetched {len(photos)} photos for VIN {vin}")
        return photos[0]

    except Exception as e:
        #logger.warning(f"Failed to fetch photos for VIN {vin}: {str(e)}")
        return []
    
if __name__ == "__main__":
    make = "Lexus"
    model = "ES"
    year = "2020"
    api_key = "sk_ad_qeCrauqVsmWM2xZUAdFvXnEj"
    vin = fetch_vehicle_vin(make, model, year, api_key) 
    print(f"VIN: {vin}")
    photos = fetch_vehicle_photos(vin, api_key)
    print(f"Photos: {photos}")