import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

def get_gemini_analysis(text: str) -> dict:
    """
    Analyze text credibility using Gemini
    """
    prompt = f"""
    You are a fact-checking AI.
    Analyze the credibility of the following content.
    Respond in JSON with:
    - credibility_score (0-100)
    - verdict (True/False)
    - reasoning (short explanation)

    Content:
    {text}
    """

    response = model.generate_content(prompt)

    return {
        "raw_response": response.text
    }

