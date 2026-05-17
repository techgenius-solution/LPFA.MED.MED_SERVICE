import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.css';

const mediaItems = [
  { id: 1, channel: "КТК", desc: "Тяжелобольные дети из Казахстана бесплатно прооперированы в Корее" },
  { id: 2, channel: "КТК", desc: "Тяжелобольные дети из Казахстана бесплатно прооперированы в Корее" },
  { id: 3, channel: "КТК", desc: "Тяжелобольные дети из Казахстана бесплатно прооперированы в Корее" },
  { id: 4, channel: "КТК", desc: "Тяжелобольные дети из Казахстана бесплатно прооперированы в Корее" },
  { id: 5, channel: "КТК", desc: "Тяжелобольные дети из Казахстана бесплатно прооперированы в Корее" },
  { id: 6, channel: "КТК", desc: "Тяжелобольные дети из Казахстана бесплатно прооперированы в Корее" },
];

const Media = () => {
  return (
    <div className="media-page">
      <Header />
      <div className="container">
        <div className="media-container">
          <h1 className="media-title">СМИ о нас</h1>
          <div className="media-layout">
            <div className="media-grid">
              {mediaItems.map(item => (
                <a key={item.id} href="#" className="media-card" aria-label={item.channel}>
                  <span className="media-card-link" aria-hidden="true">↗</span>
                  <div className="media-card-logo">КТК</div>
                  <div className="media-card-channel">{item.channel}</div>
                  <p className="media-card-desc">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a href="tel:+77010816040" className="fab-call" aria-label="Заказать звонок">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/>
        </svg>
        <span>Заказать<br />звонок</span>
      </a>

      <Footer />
    </div>
  );
};

export default Media;
