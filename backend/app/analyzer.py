def analyze_text(text: str) -> dict:
    text = text.lower()

    suspicious_words = ["scam", "free money", "urgent", "click here"]

    score = 0.0
    for word in suspicious_words:
        if word in text:
            score += 0.25

    score = min(score, 1.0)

    verdict = "Safe"
    if score >= 0.5:
        verdict = "Suspicious"

    return {
        "risk_score": score,
        "verdict": verdict
    }
