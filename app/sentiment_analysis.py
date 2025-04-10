import os
from dotenv import load_dotenv
from gnews import GNews
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

nltk.download("vader_lexicon")
load_dotenv()

# Optional API key if GNews upgrades
api_key = os.getenv("GNEWS_API_KEY")

INDUSTRY_MACRO_TOPICS = {
    "Tech": "chip shortage OR export ban OR US-China tech war OR AI regulation",
    "Automotive": "EV tariffs OR battery export policies OR supply chain disruption OR auto regulations",
    "Finance": "interest rate hike OR global inflation OR central bank policy",
    "Retail": "consumer spending OR import tariffs OR supply chain delays",
    "Energy": "oil prices OR climate policy OR global energy regulation",
    "General": "global economy OR market volatility OR tariffs OR inflation"
}

def fetch_news_gnews(query, max_articles=10):
    news = GNews(language='en', country='in', max_results=max_articles)
    results = news.get_news(query)
    return [
        {
            'title': article.get('title'),
            'published': article.get('published date')
        }
        for article in results if article.get('title')
    ]

def fetch_combined_news(company_query, industry="General", max_articles=10):
    company_news = fetch_news_gnews(company_query, max_articles=max_articles)
    macro_query = INDUSTRY_MACRO_TOPICS.get(industry, INDUSTRY_MACRO_TOPICS["General"])
    macro_news = fetch_news_gnews(macro_query, max_articles=max_articles)
    return company_news + macro_news

def analyze_sentiment(news_list):
    sid = SentimentIntensityAnalyzer()
    result = []
    scores = []

    for item in news_list:
        text = item['title']
        date = item.get('published')
        score = sid.polarity_scores(text)['compound']
        scores.append(score)

        sentiment = "Positive" if score >= 0.05 else "Negative" if score <= -0.05 else "Neutral"
        result.append({
            'headline': text,
            'published': date,
            'score': round(score, 2),
            'sentiment': sentiment
        })

    average_score = round(sum(scores) / len(scores), 2) if scores else 0.0
    return result, average_score
