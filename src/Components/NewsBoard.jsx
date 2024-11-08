import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=f4897c515ff34b92ae7b20ea695ed1e4`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          if (response.status === 429) {
            setError("Too many requests. Please try again later.");
          } else {
            setError("An error occurred while fetching the news.");
          }
          throw new Error("API Error");
        }
        return response.json();
      })
      .then(data => {
        // Filter out invalid or removed articles
        const validArticles = data.articles.filter(news => {
          return news && news.title && news.description && news.urlToImage; // Ensure essential fields exist
        });
        setArticles(validArticles); // Only set valid articles
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load news.");
      });
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
        <div>No news available at the moment.</div>
      )}
    </div>
  );
};

// Add prop validation for `category`
NewsBoard.propTypes = {
  category: PropTypes.string.isRequired,  // Expect `category` to be a string and is required
};

export default NewsBoard;
