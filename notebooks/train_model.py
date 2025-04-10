import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pandas as pd
import numpy as np
import joblib
from tqdm import tqdm
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from app.sentiment_analysis import fetch_news_gnews, analyze_sentiment

data_path = "data/processed/ipo_cleaned_data.csv"
model_path = "models/listing_price_model.pkl"
scaler_path = "models/listing_price_scaler.pkl"
sentiment_cache_path = "data/processed/sentiment_cache.csv"

df = pd.read_csv(data_path)
df.columns = df.columns.str.strip().str.lower()
df.rename(columns={
    "company": "company",
    "issue_price": "issue_price",
    "listing_price": "listing_price"
}, inplace=True)

if os.path.exists(sentiment_cache_path):
    sentiment_df = pd.read_csv(sentiment_cache_path)
else:
    sentiment_df = pd.DataFrame(columns=["company", "sentiment_score"])

scores = []
print("Fetching sentiment scores...")
for name in tqdm(df["company"]):
    cached = sentiment_df[sentiment_df["company"] == name]
    if not cached.empty:
        score = cached["sentiment_score"].values[0]
    else:
        news = fetch_news_gnews(name)
        analyzed, avg_score = analyze_sentiment(news)
        sentiment_df.loc[len(sentiment_df)] = [name, avg_score]
        score = avg_score
    scores.append(score)

df["sentiment_score"] = scores
sentiment_df.to_csv(sentiment_cache_path, index=False)

X = df[["issue_price", "sentiment_score"]]
y = df["listing_price"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print("MAE:", mean_absolute_error(y_test, y_pred))
print("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
print("R² Score:", r2_score(y_test, y_pred))

joblib.dump(model, model_path)
joblib.dump(scaler, scaler_path)

print("✅ Model and scaler saved.")
