import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <Header />
      <div className="container">
        <div className="about-container">
          <h1 className="about-title">О компании</h1>
          <div className="about-layout">
            <div className="about-main">
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop"
                  alt="О компании Smart Med Service"
                />
              </div>
              <div className="about-text">
                <p>Наша компания сделает Ваше лечение в лучших больницах Кореи максимально комфортным.</p>
                <p>Мы гордимся тем уровнем сервиса, который мы достигли за последние годы.</p>
                <p>Ваше пребывание в Корее наша забота. Мы предоставим полный спектр услуг от встречи в аэропорту до получения Ваших медицинских документов после Вашего отбытия домой.</p>
              </div>

              <button
                className="primary-btn"
                style={{ marginTop: '32px', padding: '12px 24px', fontSize: '13px' }}
              >
                📞 ЗАКАЗАТЬ ЗВОНОК
              </button>
            </div>

            <div className="about-sidebar">
              <div className="about-sidebar-contacts">
                <h4>Контакты</h4>
                <p>Тел.: +7 (701) 081-6040</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+7 (727) 081-6040</p>
                <p>Email: <a href="mailto:info@smartmedservice.com">info@smartmedservice.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
