import './ShimmerLoader.css';

function ShimmerLoader({ type = 'card', count = 4 }) {
  return (
    <div className="shimmer-wrapper">
      {Array(count).fill().map((_, index) => (
        <div className={`shimmer-card ${type}`} key={index}>
          <div className="shimmer-image" />
          <div className="shimmer-text">
            <div className="shimmer-line short" />
            <div className="shimmer-line long" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShimmerLoader;
