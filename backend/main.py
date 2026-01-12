from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from services import analyze_course_credibility, extract_course_metadata

load_dotenv()

app = FastAPI()

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    url: str

@app.get("/")
def home():
    return {"status": "Shield Active"}

@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    # 1. Extract Metadata (Simulated scraping)
    meta = extract_course_metadata(request.url)
    
    # 2. Run the Analysis
    try:
        result = analyze_course_credibility(
            url=request.url,
            price=meta['price'],
            title=meta['title'],
            description=meta['desc']
        )
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Analysis failed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)