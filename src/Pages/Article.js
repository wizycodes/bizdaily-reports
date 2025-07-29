import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Article.css';
import ShimmerLoader from '../Components/ShimmerLoader';
import fallbackImage from '../Assets/fallbackImage.jpg';
import { useArticle } from '../Context/ArticleContext'; 
import clock from '../Assets/time.png'

function Article() {
  const { selectedArticle } = useArticle(); 
  const navigate = useNavigate();
  const { id } = useParams(); // id will be article title
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('bizdaily_selected_article');
    
    if (selectedArticle?.article && selectedArticle.article.title === decodeURIComponent(id)) {
      setArticle(selectedArticle.article);
      setRelated(selectedArticle.related || []);
    } else if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.article?.title === decodeURIComponent(id)) {
          setArticle(parsed.article);
          setRelated(parsed.related || []);
        } else {
          setArticle(null);
          setRelated([]);
        }
      } catch (err) {
        console.error('Failed to parse saved article:', err);
      }
    } else {
      setArticle(null);
      setRelated([]);
    }

    window.scrollTo(0, 0);
  }, [id, selectedArticle]);

  if (!article) {
    return (
      <div style={{ textAlign: 'center' }}>
        <ShimmerLoader count={5} />
        <p>Article not found.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const rawText = article.content || article.contentSnippet || 'No content available.';
  const cleanText = rawText.replace(/\s?\[\+?\d+\s?chars\]/gi, '').trim();
  const displayText = cleanText.split(/\.\s+|\n+/).map(p => p.trim()).filter(Boolean);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Unknown date';

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  };

  const getRelativeTime = (dateStr) => {
    const now = new Date();
    const published = new Date(dateStr);
    if (isNaN(published.getTime())) return 'Unknown time';

    const diffMs = now - published;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHrs < 24) {
      const remainderMin = diffMin % 60;
      return remainderMin > 0
        ? `${diffHrs} hour${diffHrs > 1 ? 's' : ''}, ${remainderMin} minute${remainderMin > 1 ? 's' : ''} ago`
        : `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    }
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  };

  const getImage = (a) => a.image || a.enclosure?.url || fallbackImage;

  const handleRelatedClick = (item) => {
    const newRelated = related.filter((a) => a !== item);
    const data = { article: item, related: newRelated };

    localStorage.setItem('bizdaily_selected_article', JSON.stringify(data));
    navigate(`/article/${encodeURIComponent(item.title)}`);
  };

  return (
    <div className="article-layout">
      <div className="article-main">
        <h1>{article.title}</h1>

        <div className="article-meta">
          <div className="meta-top">
            By {article.source || 'Unknown Source'} • {formatDate(article.pubDate || article.publish_date)}
          </div>
          <div className="meta-time">
            <img src={clock} style={{width: '20px', height: '20px'}} alt='clock'></img>
            {getRelativeTime(article.pubDate || article.publish_date)}
          </div>
        </div>

        <img
          className="article-image"
          src={getImage(article)}
          alt={article.title}
          onError={(e) => (e.target.src = fallbackImage)}
        />

        <div className="article-body">
          {displayText.map((para, idx) => (
            <p key={idx}>{para.endsWith('.') ? para : `${para}.`}</p>
          ))}
        </div>

        <a
          href={article.link || article.url}
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
            <div key={idx}
              onClick={() => handleRelatedClick(item)}
            >
              <div className="related-article">
                <img
                  src={getImage(item)}
                  alt={item.title}
                  onError={(e) => (e.target.src = fallbackImage)}
                />
                <div className="related-info">
                  <h4>{item.title}</h4>
                  <p className="related-date">{formatDate(item.pubDate || item.publish_date)}</p>
                  <button onClick={() => handleRelatedClick(item)}>Read more</button>
                </div>
              </div>

              {idx !== related.length - 1 && (
                <div className="related-divider"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Article;
