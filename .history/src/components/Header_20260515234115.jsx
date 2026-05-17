import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/search?q=${encodeURIComponent(searchVal)}`);
  };

  return (
    <header className="main-header">
      <div className="header-top container">
        <Link to="/" className="logo-wrap">
          <div className="logo-icon">
            <div className="logo-icon-inner">
              <span></span><span></span>
              <span></span><span></span>
            </div>
          </div>
          <div className="logo-text">
            <strong>SMART</strong>
            MED<br />SERVICE
          </div>
        </Link>

        <nav className="top-nav">
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>О компании</Link>
          <Link to="/treatment" className={isActive('/treatment') ? 'active' : ''}>Лечение</Link>
          <Link to="/beauty" className={isActive('/beauty') ? 'active' : ''}>Красота</Link>
          <Link to="/checkup" className={isActive('/checkup') ? 'active' : ''}>Check Up</Link>
          <Link to="/eastern" className={isActive('/eastern') ? 'active' : ''}>Восточная медицина</Link>
          <Link to="/future" className={isActive('/future') ? 'active' : ''}>Медицина будущего</Link>
          <Link to="/promotions" className={`nav-akcii ${isActive('/promotions') ? 'active' : ''}`}>Акции</Link>
          <Link to="/contacts" className={isActive('/contacts') ? 'active' : ''}>Контакты</Link>
          <Link to="/login" className="login-btn">
            <span className="login-icon">👤</span> Войти
          </Link>
        </nav>
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
