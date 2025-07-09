import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.jpg';
import searchIcon from '../Assets/searchIcon.png';
import './Navbar.css';

function Navbar({ articles = [] }) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (trimmed) {
      const results = articles.filter((article) =>
        article.title.toLowerCase().includes(trimmed.toLowerCase())
      );

      navigate('/search', {
        state: {
          results,
          query: trimmed,
        },
      });

      setShowSearch(false);
      setQuery('');
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src={logo} alt="Bizdaily Reports" />
          <span className="tagline">Daily Business News That Matters</span>
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              About
            </NavLink>
          </li>
          <li className="search-box">
            <form onSubmit={handleSearchSubmit} className={`search-form ${showSearch ? 'expanded' : ''}`}>
              {showSearch && (
                <>
                  <input
                    type="text"
                    placeholder="Search Bizdaily..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                    autoFocus
                  />
                  {query && (
                    <span className="clear-btn" onClick={handleClear}>
                      ×
                    </span>
                  )}
                </>
              )}

              {!showSearch && (
                <button type="button" className="search-btn" onClick={() => setShowSearch(true)}>
                  <img src={searchIcon} alt="Search" style={{ width: '30px', height: '30px' }} />
                </button>
              )}
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
