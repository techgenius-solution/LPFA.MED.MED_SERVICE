import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../auth/AuthContext';
import '../../styles/Auth.css';

const Icon = {
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
      <path d="M9 11h6M9 15h4" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1Z" />
    </svg>
  ),
  hospital: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M3 21h18" />
      <path d="M12 11v4M10 13h4" />
      <path d="M9 21v-4h6v4" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  ),
};

const CARDS = [
  { to: '/profile',                 icon: Icon.user,      title: 'Профиль',   desc: 'Личные данные',     accent: 'a' },
  { to: '/profile?tab=requests',    icon: Icon.clipboard, title: 'Заявки',    desc: 'История обращений', accent: 'b' },
  { to: '/profile?tab=favorites',   icon: Icon.star,      title: 'Избранное', desc: 'Клиники и доктора', accent: 'c' },
  { to: '/treatment',               icon: Icon.hospital,  title: 'Каталог',   desc: 'Найти клинику',     accent: 'd' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <div>
      <Header />
      <div className="profile-wrap">
        <div className="container">
          <div className="dash-main">
            <div className="dash-head">
              <span className="eyebrow"><span className="dot" /> Личный кабинет</span>
              <h2>
                Добро пожаловать{firstName && ','}{' '}
                <span className="grad-text">{firstName || 'в SmartMed'}</span>
              </h2>
              <p className="dash-lede">
                Управляйте профилем, отслеживайте заявки и сохранённые клиники в одном месте.
              </p>
            </div>

            <div className="dash-grid">
              {CARDS.map((c) => (
                <Link key={c.title} to={c.to} className={`dash-card dash-${c.accent}`}>
                  <div className="dash-card-icon">{c.icon}</div>
                  <div className="dash-card-body">
                    <strong>{c.title}</strong>
                    <span>{c.desc}</span>
                  </div>
                  <span className="dash-card-cta" aria-hidden="true">{Icon.arrow}</span>
                  <span className="dash-card-glow" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
