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
          `https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=us&max=100&apikey=9664b0b77e0fc349fc2c230fff971548`
        );
        const data = await response.json();
        
        if (Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          console.error('Unexpected API format:', data);
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
  );
}

export default App;
