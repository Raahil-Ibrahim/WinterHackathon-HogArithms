import os
import vertexai
from vertexai.generative_models import GenerativeModel
from googleapiclient.discovery import build
import json

# Initialize Google Cloud
PROJECT_ID = os.getenv("GOOGLE_PROJECT_ID")
LOCATION = "us-central1"
vertexai.init(project=PROJECT_ID, location=LOCATION)

# --- 1. THE DETECTIVE (Google Custom Search) ---
def get_external_sentiment(course_title):
    """
    Searches Google for reviews/reddit threads about the course 
    to see what real people think.
    """
    api_key = os.getenv("GOOGLE_SEARCH_API_KEY")
    cse_id = os.getenv("GOOGLE_CSE_ID") # Custom Search Engine ID
    
    if not api_key or not cse_id:
        return "Could not fetch external reviews (API Key missing)."

    service = build("customsearch", "v1", developerKey=api_key)
    
    # Search for "Course Name reviews reddit" or "is Course Name worth it"
    query = f"{course_title} review reddit worth it"
    try:
        res = service.cse().list(q=query, cx=cse_id, num=5).execute()
        snippets = [item['snippet'] for item in res.get('items', [])]
        return " ".join(snippets)
    except Exception as e:
        print(f"Search failed: {e}")
        return "No external reviews found."

# --- 2. THE JUDGE (Vertex AI / Gemini) ---
def analyze_course_credibility(url, price, title, description):
    """
    Uses Gemini to analyze the value proposition.
    """
    # Step 1: Get external sentiment from Google Search
    external_reviews = get_external_sentiment(title)

    # Step 2: Ask Gemini
    model = GenerativeModel("gemini-1.5-flash")
    
    prompt = f"""
    You are a Career Education Expert. Analyze this course offer.

    COURSE DATA:
    - Title: {title}
    - URL: {url}
    - Price: {price}
    - Description: {description}
    - External Sentiment (Search Results): {external_reviews}

    YOUR TASK:
    1. Determine if the course is "Credible" or "Not Credible/Low Value" based on:
       - Price vs. Market Value (Is it overpriced?)
       - External Sentiment (Do people call it a scam or useless?)
       - Domain Reputation (Is it a known provider like Coursera/Udemy or a random site?)
    
    2. If it is NOT credible, suggest 3 better alternatives.

    OUTPUT JSON FORMAT ONLY:
    {{
        "score": (0-100),
        "verdict": "RECOMMENDED" | "CAUTION" | "AVOID",
        "reasoning": "string",
        "price_analysis": "string",
        "review_summary": "string",
        "alternatives": [
            {{ "name": "Course Name", "platform": "Platform", "link": "url" }}
        ]
    }}
    """
    
    response = model.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"}
    )
    
    return json.loads(response.text)

# --- 3. MOCK SCRAPER (For Hackathon Demo) ---
# Real scraping is hard to maintain. We simulate extracting data from the link.
def extract_course_metadata(url):
    # In a real app, use BeautifulSoup or Playwright here.
    # For demo, we guess based on URL or return generic data.
    if "udemy" in url:
        return {"title": "Detected Udemy Course", "price": "$19.99", "desc": "Online video course."}
    if "linkedin" in url:
        return {"title": "LinkedIn Learning Path", "price": "$39.99/mo", "desc": "Professional certification."}
    
    # Fallback / Generic
    return {"title": "Unknown Course", "price": "$997", "desc": "Generic high-ticket course."}