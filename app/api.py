from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from sentiment_analysis import fetch_news_gnews, analyze_sentiment

app = Flask(__name__)
# Configure CORS to allow requests from the React frontend
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})

# Load model and scaler
model = joblib.load("models/listing_price_model.pkl")
scaler = joblib.load("models/listing_price_scaler.pkl")

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    company_name = data.get('company_name')
    issue_price = float(data.get('issue_price', 100.0))
    
    if not company_name or not company_name.strip():
        return jsonify({"error": "Please enter a valid company name."}), 400
    
    try:
        # Fetch news and analyze sentiment
        news_list = fetch_news_gnews(company_name)
        analyzed_data, sentiment_score = analyze_sentiment(news_list)
        
        # Make prediction
        features = scaler.transform([[issue_price, sentiment_score]])
        predicted_price = model.predict(features)[0]
        gain_pct = ((predicted_price - issue_price) / issue_price) * 100
        
        return jsonify({
            "predicted_price": round(predicted_price, 2),
            "gain_percentage": round(gain_pct, 2),
            "sentiment_score": sentiment_score,
            "news_data": analyzed_data
        })
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 