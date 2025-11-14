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
