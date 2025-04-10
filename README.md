# IPO Listing Price Predictor

Hey there! This project helps predict IPO listing prices by analyzing news sentiment and market data. It's pretty straightforward - you give it a company name and issue price, and it'll tell you what it thinks the stock might trade at when it goes public.

## What's Inside

- Predicts IPO listing prices using a mix of market data and news sentiment
- Scans news articles to understand market mood about the company
- Clean, modern UI built with React
- Python backend that handles all the heavy lifting

## Project Structure

We've got two main parts:

1. Backend (Python stuff):
   - `app/api.py` - Main API server
   - `app/sentiment_analysis.py` - News analysis engine
   - `app/ipo_predictor_app.py` - Old version (keeping it for reference)
   - `models/` - Where we keep our trained ML model
   - `data/` - Training data for the model

2. Frontend (The pretty part):
   - `frontend/src/` - React components and logic
   - `frontend/public/` - Static assets

## Getting Started

### Backend Setup

1. Make sure you have Python installed
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Fire up the server:
   ```
   python app/api.py
   ```

### Frontend Setup

1. Make sure Node.js is installed
2. Head to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm start
   ```
5. Open http://localhost:3000 in your browser

## How to Use

1. Enter the company name and issue price
2. Hit "Predict Listing Price"
3. Check out the results:
   - Predicted listing price
   - Potential gains/losses
   - News sentiment analysis

## Tech Stack

- Backend: Python, Flask, scikit-learn, NLTK
- Frontend: React, Material-UI
- Data: GNews API for news articles
- ML: Custom model trained on historical IPO data