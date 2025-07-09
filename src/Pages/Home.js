import './Home.css';
import { useNavigate } from 'react-router-dom';
import fallbackImage from '../Assets/fallbackImage.jpg';
import LatestNewsSlider from '../Components/LatestNewsSlider';
import ShimmerLoader from '../Components/ShimmerLoader';

function Home({ articles }) {
  const navigate = useNavigate();

  if (!articles || articles.length === 0) {
    return <ShimmerLoader count={5} />;
  }

  // Find first valid featured article (must have image & description)
  const featuredArticle = articles.find(
    (article) => article.image && article.description
  );

  // Filter out the featured article from the rest
  const latestArticles = articles.filter((a) => a !== featuredArticle);

  return (
    <div className="home">
      {featuredArticle && (
        <section className="featured">
          <img
            src={featuredArticle.image || fallbackImage}
            alt="Featured"
          />
          <div className="featured-text">
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.description}</p>
            <button
              className="read-more"
              onClick={() =>
                navigate(`/article/featured`, {
                  state: {
                    article: featuredArticle,
                    related: latestArticles.slice(0, 5),
                  },
                })
              }
            >
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
