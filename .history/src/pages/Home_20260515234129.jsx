import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClinicCard from '../components/ClinicCard';
import StarRating from '../components/StarRating';
import { clinics, clinicDirections } from '../data/clinics';
import { homeDirections } from '../data/treatments';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <section className="home-hero">
        <div className="container">
          <div className="home-hero-inner">
            <div className="hero-text">
              <h1>Здоровье без границ</h1>
              <p>Поиск по клиникам, докторам и болезням</p>
              <div className="hero-search">
                <input type="text" placeholder="Ключевое слово..." />
                <button>🔍 Найти</button>
              </div>
              <div className="hero-stats">В базе: <strong>34 клиники</strong>, <strong>784 доктора</strong></div>
              <div className="hero-popular">
                Популярные запросы:&nbsp;
                <span>Межпозвоночная грыжа</span>&nbsp;
                <span>Синчон Северанс</span>&nbsp;
                <span>Ортопедия и травматология</span>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop"
                alt="Doctor"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="section-clinics">
          <div className="section-header">
            <h2>Рекомендуемые клиники</h2>
            <Link to="/treatment" className="link-btn">Все клиники</Link>
          </div>
          <div className="clinics-carousel">
            <div className="clinics-grid">
              {clinics.map(c => <ClinicCard key={c.id} clinic={c} />)}
            </div>
          </div>
        </section>

        <section className="section-directions">
          <div className="section-header">
            <h2>Направления</h2>
            <Link to="/treatment" className="link-btn">Все направления</Link>
          </div>
          <div className="directions-grid">
            <div className="direction-card">
              <div className="direction-card-header">
                <div className="direction-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <h3>Онкология</h3>
              </div>
              <div className="dir-items">
                <span className="dir-item">Рак груди</span>
                <span className="dir-item">Меланома</span>
                <span className="dir-item">Рак простаты</span>
                <span className="dir-item">Рак желудка</span>
                <span className="dir-item">Рак легких</span>
                <span className="dir-item">Рак поджелудочной железы</span>
              </div>
              <Link to="/treatment?direction=Онкология" className="dir-view-all">Весь список</Link>
            </div>

            <div className="direction-card">
              <div className="direction-card-header">
                <div className="direction-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3>Check Up</h3>
              </div>
              <div className="checkup-tabs">
                <span className="checkup-tab active">Мужской</span>
                <span className="checkup-tab">Женский</span>
                <span className="checkup-tab" style={{ color: '#3db54a' }}>Детский</span>
              </div>
              <div className="dir-items">
                <span className="dir-item" style={{ color: '#3db54a' }}>Специализированная</span>
              </div>
              <Link to="/checkup" className="dir-view-all">Весь список</Link>
            </div>

            <div className="direction-card">
              <div className="direction-card-header">
                <div className="direction-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
                <h3>Красота</h3>
              </div>
              <div className="dir-items">
                <span className="dir-item">Рак груди</span>
                <span className="dir-item">Меланома</span>
                <span className="dir-item">Рак простаты</span>
                <span className="dir-item">Рак желудка</span>
              </div>
              <Link to="/beauty" className="dir-view-all">Весь список</Link>
            </div>

            <div className="direction-card">
              <div className="direction-card-header">
                <div className="direction-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                  </svg>
                </div>
                <h3>Медицина будущего</h3>
              </div>
              <div className="dir-items">
                <span className="dir-item">Рак груди</span>
                <span className="dir-item">Меланома</span>
                <span className="dir-item">Рак простаты</span>
                <span className="dir-item">Рак желудка</span>
              </div>
              <Link to="/future" className="dir-view-all">Весь список</Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
