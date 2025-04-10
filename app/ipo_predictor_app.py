import streamlit as st
import joblib
import numpy as np

from sentiment_analysis import fetch_news_gnews, analyze_sentiment

# Load model and scaler
model = joblib.load("models/listing_price_model.pkl")
scaler = joblib.load("models/listing_price_scaler.pkl")

st.set_page_config(page_title="IPO Listing Price Predictor", layout="centered")
st.title("IPO Listing Price Predictor")
st.subheader("Estimate the listing price of an IPO based on sentiment and issue price.")

# Input Section
company_name = st.text_input("IPO / Company Name", placeholder="e.g. Zepto")
issue_price = st.number_input("Issue Price (₹)", min_value=1.0, value=100.0, step=1.0)

if st.button("Predict Listing Price"):
    if not company_name.strip():
        st.warning("Please enter a valid company name.")
    else:
        with st.spinner("Fetching news and calculating sentiment..."):
            news_list = fetch_news_gnews(company_name)
            analyzed_data, sentiment_score = analyze_sentiment(news_list)

        st.markdown(f"**Sentiment Score:** `{sentiment_score}`")

        features = scaler.transform([[issue_price, sentiment_score]])
        predicted_price = model.predict(features)[0]
        gain_pct = ((predicted_price - issue_price) / issue_price) * 100

        st.subheader("Prediction Result")
        st.markdown(f"**Predicted Listing Price:** ₹{round(predicted_price, 2)}")
        st.markdown(f"**Expected Gain %:** {round(gain_pct, 2)}%")

        st.subheader("Headlines Used")
        for item in analyzed_data:
            title = item["headline"]
            published = item["published"]
            score = item["score"]
            sentiment = item["sentiment"]
            st.markdown(f"- {title} ({sentiment}, score={score})")
