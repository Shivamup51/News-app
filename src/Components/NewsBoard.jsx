import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY; // Fetch API key from environment variables
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          if (response.status === 429) {
            setError("Too many requests. Please try again later.");
          } else if (response.status === 426) {
            setError("Upgrade Required: Please check your API usage plan.");
          } else {
            setError("An error occurred while fetching the news.");
          }
          throw new Error("API Error");
        }

        const data = await response.json();

        // Filter valid articles
        const validArticles = data.articles.filter(news => 
          news && news.title && news.description && news.urlToImage
        );

        setArticles(validArticles);

      } catch (err) {
        console.error(err);
        setError("Failed to load news. Please try again later.");
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {Array.isArray(articles) && articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        <div className="text-center">No news available at the moment.</div>
      )}
    </div>
  );
};

// Prop validation for category
NewsBoard.propTypes = {
  category: PropTypes.string.isRequired,
};

export default NewsBoard;
