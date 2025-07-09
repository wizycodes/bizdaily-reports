import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Article.css';
import ShimmerLoader from '../Components/ShimmerLoader';
import fallbackImage from '../Assets/fallbackImage.jpg';

function Article() {
  const location = useLocation();
  const navigate = useNavigate();

  const [article, setArticle] = useState(location.state?.article || null);
  const [related, setRelated] = useState(location.state?.related || []);

  useEffect(() => {
    // Re-run this whenever a new article is passed via navigation
    setArticle(location.state?.article || null);
    setRelated(location.state?.related || []);
    window.scrollTo(0, 0); // Scroll to top on new article load
  }, [location.state]);

  if (!article) {
    return (
      <div style={{ textAlign: 'center' }}>
        <ShimmerLoader count={5} />
        <p>Article not found.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  // Clean up API text
  const cleanContent = (text) =>
    text?.replace(/\[\+\d+\schars\]/, '').trim() || 'No content available.';

  const fullText = cleanContent(article.content || article.description);

  return (
    <div className="article-layout">
      <div className="article-main">
        <h1>{article.title}</h1>

        <div className="article-meta">
          <span>By {article.author || 'Unknown'}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>

        {article.urlToImage && (
          <img
            className="article-image"
            src={article.urlToImage || fallbackImage}
            alt={article.title}
          />
        )}

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: fullText }}
        />

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="read-more"
        >
          View full article at source →
        </a><br />

        <p className="back-link" onClick={() => navigate('/')}>
          ← Back to Home
        </p>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h3>YOU MAY ALSO LIKE</h3>
          {related.map((item, idx) => (
            <div className="related-article" key={idx}>
              <img
                src={item.urlToImage || fallbackImage}
                alt={item.title}
              />
              <div className="related-info">
                <h4>{item.title}</h4>
                <button
                  onClick={() =>
                    navigate(`/article/${idx}`, {
                      state: {
                        article: item,
                        related: related.filter((a) => a !== item),
                      },
                    })
                  }
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Article;
