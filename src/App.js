import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Article from './Pages/Article';
import SearchResults from './Pages/SearchResults';
import Footer from './Components/Footer';
import ShimmerLoader from './Components/ShimmerLoader';
import { ArticleProvider } from './Context/ArticleContext'; // ✅ Import provider
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
        const response = await fetch('https://ghana-business-api.onrender.com/api/news');
        const data = await response.json();

        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error('Unexpected backend response:', data);
        }
      } catch (err) {
        console.error('Error fetching from backend:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessNews();
  }, []);

  if (loading) {
    return <ShimmerLoader count={5} />;
  }

  return (
    <ArticleProvider>
      <Router>
        <div className="App">
          {isMobile ? (
            <div className="mobile-blocker">
              <h2>This site is best viewed on a desktop or larger screen.</h2>
              <p>Please visit Bizdaily Reports using a laptop, desktop, or tablet.</p>
            </div>
          ) : (
            <>
              <Navbar articles={articles} />
              <Routes>
                <Route path="/" element={<Home articles={articles} />} />
                <Route path="/about" element={<About />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/search" element={<SearchResults />} />
              </Routes>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </ArticleProvider>
  );
}

export default App;
