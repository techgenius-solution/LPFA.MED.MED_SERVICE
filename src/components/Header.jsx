import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');
  const [activeNav, setActiveNav] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // close mobile nav and reset active nav on route change
    setActiveNav(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/search?q=${encodeURIComponent(searchVal)}`);
  };

  const links = [
    { to: '/about', label: 'О компании' },
    { to: '/treatment', label: 'Лечение' },
    { to: '/beauty', label: 'Красота' },
    { to: '/checkup', label: 'Check Up' },
    { to: '/eastern', label: 'Восточная медицина' },
    { to: '/future', label: 'Медицина будущего' },
    { to: '/promotions', label: 'Акции', className: 'nav-akcii' },
    { to: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className="main-header">
      <div className="header-top container">
        <Link to="/" className="logo-wrap" onClick={() => setMobileOpen(false)}>
          <div className="logo-icon">
            <div className="logo-icon-inner">
              <span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div className="logo-text">
            <strong>SMART</strong>
            MED<br/>SERVICE
          </div>
        </Link>

        {/* hamburger - visible on small screens */}
        <button
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(prev => !prev)}
        >
          <span className="bar"></span>
        </button>

        <nav className="top-nav" aria-hidden={mobileOpen}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => { setActiveNav(link.to); setMobileOpen(false); }}
              className={(isActive(link.to) || activeNav === link.to) ? (`${link.className || ''} active`).trim() : (link.className || '')}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/login" onClick={() => setMobileOpen(false)} className="login-btn">
            <span className="login-icon">👤</span> Войти
          </Link>
        </nav>
      </div>

      {/* mobile navigation panel */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} role="navigation" aria-label="Mobile navigation">
        <div className="mobile-nav-inner container">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => { setActiveNav(link.to); setMobileOpen(false); }}
              className={(isActive(link.to) || activeNav === link.to) ? (`${link.className || ''} active`).trim() : (link.className || '')}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={() => setMobileOpen(false)} className="login-btn">
            <span className="login-icon">👤</span> Войти
          </Link>
        </div>
      </div>

      <div className="search-banner">
        <div className="container">
          <span className="search-banner-label">Поиск по клиникам, докторам и болезням:</span>
          <form className="search-banner-input" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Ключевое слово..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <button type="submit">🔍 Найти</button>
          </form>
          <div className="search-banner-popular">
            Популярные запросы:&nbsp;
            <span onClick={() => navigate('/search?q=Межпозвоночная+грыжа')}>Межпозвоночная грыжа</span>&nbsp;
            <span onClick={() => navigate('/search?q=Миома+матки')}>Миома матки</span>
            <br />
            <span onClick={() => navigate('/clinic/1')}>Синчон Северанс</span>&nbsp;
            <span onClick={() => navigate('/search?q=Ортопедия')}>Ортопедия и травматология</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
