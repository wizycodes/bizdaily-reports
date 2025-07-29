import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fallbackImage from '../Assets/fallbackImage.jpg';
import LatestNewsSlider from '../Components/LatestNewsSlider';
import ShimmerLoader from '../Components/ShimmerLoader';
import { useArticle } from '../Context/ArticleContext'; 
import trending from '../Assets/trending.png';
import arrow from '../Assets/right-arrow.png';

function Home({ articles }) {
  const navigate = useNavigate();
  const { setSelectedArticle } = useArticle();

  const [trendingIndex, setTrendingIndex] = useState(0);
  const [trendingArticles, setTrendingArticles] = useState([]);

  useEffect(() => {
    if (articles && articles.length > 0) {
      const shuffled = [...articles].sort(() => 0.5 - Math.random());
      setTrendingArticles(shuffled.slice(0, 5));
    }
  }, [articles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingIndex((prevIndex) =>
        trendingArticles.length === 0 ? 0 : (prevIndex + 1) % trendingArticles.length
      );
    }, 5000); // Change headline every 5 seconds

    return () => clearInterval(interval);
  }, [trendingArticles]);

  if (!articles || articles.length === 0) {
    return <ShimmerLoader count={5} />;
  }

  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  const getImage = (article) =>
    article.image || article.enclosure?.url || fallbackImage;

  const getSnippet = (article) =>
    article.contentSnippet || article.content || 'No preview available.';

  const featuredArticle = articles.find(
    (article) => getImage(article) && getSnippet(article)
  );

  const latestArticles = articles.filter((a) => a !== featuredArticle);

  const handleReadMore = (article) => {
    const related = latestArticles
      .filter(
        (a) =>
          a.title !== article.title &&
          article.title &&
          a.title.toLowerCase().includes(
            article.title.split(' ')[0]?.toLowerCase()
          )
      )
      .slice(0, 5);

    setSelectedArticle({ article, related });
    navigate(`/article/${encodeURIComponent(article.title)}`);
  };

  return (
    <div className="home">
      {/* 🔥 Trending Bar */}
      {trendingArticles.length > 0 && (
        <div className="trending-bar" onClick={() => handleReadMore(trendingArticles[trendingIndex])}>
          <span className="trending-label">
            <img src={trending} alt='trending' style={{width: '10px', height: '10px'}}></img>
            TRENDING
            </span>
          <span className="trending-headline">
            {trendingArticles[trendingIndex].title}
            <img src={arrow} alt='arrow-right' style={{width: '20px', height: '20px'}}></img>
          </span>
        </div>
      )}

      {featuredArticle && (
        <section className="featured">
          <div className="featured-label">TOP FEATURED POST</div>

          <img
            src={getImage(featuredArticle)}
            alt="Featured"
          />

          <div className="featured-text">
            <h2>{featuredArticle.title}</h2>
            <p>{truncateText(getSnippet(featuredArticle), 30)}</p>
            <button className="read-more" onClick={() => handleReadMore(featuredArticle)}>
              Read more
            </button>
          </div>
        </section>
      )}

      <section className="latest">
        <LatestNewsSlider articles={latestArticles} />
      </section>
    </div>
  );
}

export default Home;
