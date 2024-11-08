import PropTypes from "prop-types";
import image from "../assets/News-img.png"; // Placeholder image

const NewsItem = ({ title, description, src, url }) => {
  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-2 mx-4 px-2 py-2" style={{ maxWidth: "345px" }}>
      <img src={src ? src : image} style={{ height: "200px", width: "100%" }} className="card-img-top" alt="news" />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 50)}...</h5>
        <p className="card-text">
          {description ? description.slice(0, 90) : "No description available."}
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Read More
        </a>
      </div>
    </div>
  );
};

// Prop validation
NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  src: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default NewsItem;
