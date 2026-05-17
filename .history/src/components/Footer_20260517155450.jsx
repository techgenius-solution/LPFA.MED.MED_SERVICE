import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-logo-wrap">
            <div className="footer-logo-icon">
              <div className="footer-logo-icon-inner">
                <span></span><span></span>
                <span></span><span></span>
              </div>
            </div>
            <div className="footer-logo-text">
              <strong>SMART</strong>
              MED<br />SERVICE
            </div>
          </div>

          <div className="footer-col">
            <h4>О компании</h4>
            <ul>
              <li><Link to="/about">Smart Med Service</Link></li>
              <li><Link to="/blog">Блог</Link></li>
              <li><Link to="/media">СМИ о нас</Link></li>
              <li><Link to="/contacts">Контакты</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Направления</h4>
            <ul>
              <li><Link to="/treatment">Лечение</Link></li>
              <li><Link to="/beauty">Красота</Link></li>
              <li><Link to="/checkup">Check Up</Link></li>
              <li><Link to="/eastern">Восточная медицина</Link></li>
              <li><Link to="/future">Медицина будущего</Link></li>
              <li><Link to="/promotions">Акции</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Контакты</h4>
            <ul>
              <li>Тел.: +7 (701) 081-6040</li>
              <li>+7 (727) 081-6040</li>
              <li>
                <a href="mailto:info@smartmedservice.com" style={{ color: '#3db54a' }}>
                  info@smartmedservice.com
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-social">
            <a href="#" className="social-icon" title="WhatsApp">💬</a>
            <a href="#" className="social-icon" title="YouTube">▶</a>
            <a href="#" className="social-icon" title="Facebook">f</a>
            <a href="#" className="social-icon" title="VK">VK</a>
            <a href="#" className="social-icon" title="Telegram">✈</a>
            <a href="#" className="social-icon" title="Instagram">📷</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Tech Genius Academy © 2019</span>
          <span>Smart Med Service © 2019</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
