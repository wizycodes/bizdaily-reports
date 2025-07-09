import { Link } from 'react-router-dom';
import './ArticleCard.css';

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <img src={article.image} alt={article.title} />
      <div className="card-content">
        <h4>{article.title}</h4>
        <p>{article.excerpt}</p>
        <Link to={`/article/${article.id}`}>Read more →</Link>
      </div>
    </div>
  );
}

export default ArticleCard;
