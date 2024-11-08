import PropTypes from "prop-types"; // Import PropTypes
import image from '../assets/News-img.png';

const NewsItem = ({ title, description, src, url }) => {
  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-2 mx-4 px-2 py-2" style={{ maxWidth: "345px" }}>
      <img src={src ? src : image} style={{ height: "200px", width: "100%" }} className="card-img-top" alt="news-thumbnail" />
      <div className="card-body">
        <h5 className="card-title">{title ? title.slice(0, 50) : "No Title Available"}</h5>
        <p className="card-text">
          {description ? description.slice(0, 90) : "No description available for this news article."}
        </p>
        <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

// Add prop validation for `title`, `description`, `src`, and `url`
NewsItem.propTypes = {
  title: PropTypes.string.isRequired,       // Expect `title` to be a string and is required
  description: PropTypes.string.isRequired, // Expect `description` to be a string and is required
  src: PropTypes.string,                    // `src` can be a string (optional)
  url: PropTypes.string.isRequired,         // Expect `url` to be a string and is required
};

export default NewsItem;
