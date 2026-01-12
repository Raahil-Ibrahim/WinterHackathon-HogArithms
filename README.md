Project Name:

Course credibility system

Description
The product being developed checks if the course we're looking at is credible or not.

Features
.Credibility system
.Easy access
.Modularisation

Frontend (User Interface)
React.js (Vite): Chosen for its speed and component-based architecture, allowing us to build a responsive, interactive dashboard.

Tailwind CSS: Used for rapid UI development and a clean, modern aesthetic without writing custom CSS files.

Lucide React: For lightweight, consistent iconography (Shields, Charts, Alerts).

Backend (Logic & API)
Python (3.9+): The primary language for our backend logic and data processing.

FastAPI: selected for its high performance (asynchronous support) and automatic API documentation.

Uvicorn: An ASGI web server implementation to run the FastAPI application.

Google Technologies Used
Google Vertex AI (Gemini 1.5 Flash): The "Brain" of the operation. We use Gemini to analyze course descriptions, pricing data, and reviews to generate a semantic "Credibility Score" and "ROI Verdict."

Google Custom Search JSON API: The "Detective." Allows our backend to programmatically search the live web for Reddit threads and external reviews to validate user sentiment.

Google Web Risk API: The "Security Guard." instantly checks URLs against Google's massive database of known phishing and malware sites before the AI even analyzes them.

Google Cloud Console,Programmable Search Engine,gcloud

Setup Instructions
Steps to run the project locally:
1. Clone the repository
2. Install dependencies
3. Add environment variables (if any)
4. Run the project

 Team Members
- Raahil Ibrahim
- Milind Manoj Naik
- Taahir Abdulla
- Asher Pinto
