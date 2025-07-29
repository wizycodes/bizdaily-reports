import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fallbackImage from '../Assets/fallbackImage.jpg';
import './LatestNewsSlider.css';
import { useArticle } from '../Context/ArticleContext'; // ✅ import context

function LatestNewsSlider({ articles }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setSelectedArticle } = useArticle(); // ✅ grab setter from context
  const navigate = useNavigate();

  const itemsPerPage = 4;
  const totalSlides = Math.ceil(articles.length / itemsPerPage);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getVisibleArticles = () => {
    const start = currentSlide * itemsPerPage;
    return articles.slice(start, start + itemsPerPage);
  };

  const getImage = (article) => {
    return article.image || article.enclosure?.url || fallbackImage;
  };

  const handleReadMore = (article) => {
    const related = articles
      .filter(
        (a) =>
          a.title !== article.title &&
          article.title &&
          a.title
            .toLowerCase()
            .includes(article.title.split(' ')[0]?.toLowerCase())
      )
      .slice(0, 5);

    setSelectedArticle({ article, related }); // ✅ set to context/localStorage
    navigate(`/article/${encodeURIComponent(article.title)}`); // ✅ navigate by title
  };

  const renderPagination = () => {
    const pages = [];
    const total = totalSlides;

    if (total <= 7) {
      for (let i = 0; i < total; i++) pages.push(i);
    } else {
      pages.push(0);
      if (currentSlide > 2) pages.push('...');

      for (
        let i = Math.max(1, currentSlide - 1);
        i <= Math.min(total - 2, currentSlide + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentSlide < total - 3) pages.push('...');
      pages.push(total - 1);
    }

    return pages.map((page, index) =>
      page === '...' ? (
        <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
      ) : (
        <button
          key={page}
          className={`page-button ${page === currentSlide ? 'active' : ''}`}
          onClick={() => goToSlide(page)}
        >
          {page + 1}
        </button>
      )
    );
  };

  return (
    <div className="latest-slider">
      <h3>Latest News</h3>

      <div className="latest-slider-container">
        <button
          className="arrow-button left"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          ◀
        </button>

        <div className="latest-grid">
          {getVisibleArticles().map((article, index) => (
            <div
              key={index}
              className="latest-card latest-card-link"
              onClick={() => handleReadMore(article)} // ✅ new behavior
              style={{ cursor: 'pointer' }}
            >
              <img src={getImage(article)} alt={article.title} />
              <h4>{article.title}</h4>
              <span className="read-more">Read more</span>
            </div>
          ))}
        </div>

        <button
          className="arrow-button right"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
        >
          ▶
        </button>
      </div>

      <div className="pagination-numbers">{renderPagination()}</div>
    </div>
  );
}

export default LatestNewsSlider;
