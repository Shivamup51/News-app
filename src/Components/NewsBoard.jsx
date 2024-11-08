import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true); // Start loading
        setError(""); // Reset error state

        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) {
          setError("API key is missing. Check your .env configuration.");
          setLoading(false);
          return;
        }

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 429) {
            setError("Too many requests. Please try again later.");
          } else {
            setError("An error occurred while fetching the news.");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        const validArticles = data.articles.filter(
          (news) => news && news.title && news.description && news.urlToImage
        );
        setArticles(validArticles);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load news.");
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {loading && <div className="text-center">Loading news...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {Array.isArray(articles) && articles.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center">
          {articles.map((news, index) => (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          ))}
        </div>
      ) : (
        !loading && <div>No news available at the moment.</div>
      )}
    </div>
  );
};

// Add prop validation for `category`
NewsBoard.propTypes = {
  category: PropTypes.string.isRequired, // Expect `category` to be a string and is required
};

export default NewsBoard;
