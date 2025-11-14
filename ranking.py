import json

def parseJSON(input_data):
    """Accept a dict, a JSON string, or a file-like object and return a dict."""
    if isinstance(input_data, dict):
        return input_data
    if isinstance(input_data, str):
        return json.loads(input_data)
    # try to treat as file-like
    try:
        return json.load(input_data)
    except Exception:
        raise TypeError("parse() expected a dict, a JSON string, or a file-like object")
    
def get_fit_score(user_rank, car_scores):
    totalScore = 0
    for letter, score in car_scores:
        userPriority = user_rank[letter]
        totalScore += (score * (7 - userPriority))

    return totalScore / 21.0

def get_monthly_miles(user_answers):
    tripsPerWeek = 0
    if user_answers["driveDaily"] == "yes":
        tripsPerWeek = 7
    else:
        tripsPerWeek = user_answers["tripsPerWeek"]
        if '-' in tripsPerWeek:
            low, high = tripsPerWeek.split('-')
            tripsPerWeek = (int(low) + int(high)) / 2

    tripMinutes = user_answers["tripMinutes"]
    if '-' in tripMinutes:
        low, high = tripMinutes.split('-')
        tripMinutes = (int(low) + int(high)) / 2

    avgSpeed = user_answers["avgSpeed"]
    monthlyMiles = (tripMinutes / 60) * avgSpeed * tripsPerWeek * 4.33
    return monthlyMiles
