import { useState } from 'react';
import { Link } from 'react-router-dom';
import fallbackImage from '../Assets/fallbackImage.jpg';
import './LatestNewsSlider.css';

function LatestNewsSlider({ articles }) {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  return (
    <div className="latest-slider">
      <h3>Latest News</h3>
      <div className="slider-controls">
        <button onClick={prevSlide} disabled={currentSlide === 0}>
          ◀
        </button>
        <button onClick={nextSlide} disabled={currentSlide === totalSlides - 1}>
          ▶
        </button>
      </div>

      <div className="latest-grid">
        {getVisibleArticles().map((article, index) => (
          <div key={index} className="latest-card">
            <img src={article.urlToImage || fallbackImage} alt={article.title} />
            <h4>{article.title}</h4>
            <Link
              to={`/article/${currentSlide * itemsPerPage + index}`}
              state={{
                article,
                related: articles
                  .filter((a) =>
                    a.title !== article.title &&
                    (a.source.name === article.source.name ||
                    a.title.toLowerCase().includes(article.title.split(' ')[0].toLowerCase()))
                  )
                  .slice(0, 5),
              }}
              className="read-more"
            >
              Read more
            </Link>


          </div>
        ))}
      </div>

      <div className="pagination-dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default LatestNewsSlider;
