import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, query } = location.state || {};

  if (!results || !query) {
    return (
      <div className="search-container">
        <p>No search performed.</p>
        <button className="read-more" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="search-container">
      <h2>Search results for: <em>{query}</em></h2>

      {results.length === 0 ? (
        <p>No matching articles found.</p>
      ) : (
        results.map((article, index) => (
          <div className="related-article" key={index}>
            <img
              src={article.urlToImage || require('../Assets/fallbackImage.jpg')}
              alt={article.title}
            />
            <div className="related-info">
              <h4>{article.title}</h4>
              <button
                className="read-more"
                onClick={() =>
                  navigate(`/article/${index}`, {
                    state: {
                      article,
                      related: results.filter((a) => a !== article).slice(0, 5),
                    },
                  })
                }
              >
                Read more
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SearchResults;
