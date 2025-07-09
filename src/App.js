import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Article from './Pages/Article';
import SearchResults from './Pages/SearchResults';
import Footer from './Components/Footer';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchBusinessNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=business&country=us&pageSize=100&apiKey=633d8cf2d47e45308516f82f2913084b`
        );
        const data = await response.json();
        if (data.status === 'ok') {
          setArticles(data.articles);
        } else {
          console.error('API error:', data);
        }
      } catch (err) {
        console.error('Network error:', err);
      }
    };

    fetchBusinessNews();
  }, []);

  return (
    <Router>
      <div className="App">
        {isMobile ? (
          <div className="mobile-blocker">
            <h2>This site is best viewed on a desktop or larger screen.</h2>
            <p>Please visit bizdaily reports using a laptop, desktop, or tablet.</p>
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
  );
}

export default App;
