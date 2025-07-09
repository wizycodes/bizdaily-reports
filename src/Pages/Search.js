import { useLocation, useNavigate } from 'react-router-dom';
import './Search.css';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, query } = location.state || {};

  if (!results) {
    return (
      <div className="search-container">
        <p>No search performed.</p>
        <button onClick={() => navigate('/')}>← Back to Home</button>
      </div>
    );
  }

  return (
    <div className="search-container">
      <h2>Search results for: <em>{query}</em></h2>

      {results.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        results.map((article, index) => (
          <div className="related-article" key={index}>
            <img src={article.urlToImage} alt={article.title} />
            <div className="related-info">
              <h4>{article.title}</h4>
              <button
                onClick={() =>
                  navigate(`/article/${index}`, {
                    state: { article, related: results.filter((a) => a !== article).slice(0, 5) },
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

export default Search;
