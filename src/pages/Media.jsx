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
                <div key={item.id} className="media-card">
                  <span className="media-card-link">↗</span>
                  <div className="media-card-logo">КТК</div>
                  <div className="media-card-channel">{item.channel}</div>
                  <p className="media-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          right: '20px',
          bottom: '80px',
          background: '#3db54a',
          color: '#fff',
          padding: '10px 14px',
          borderRadius: '4px',
          fontSize: '11px',
          cursor: 'pointer',
          textAlign: 'center',
          fontWeight: '600',
          lineHeight: '1.3',
          zIndex: 100,
        }}
      >
        📞 ЗАКАЗАТЬ<br />ЗВОНОК
      </div>

      <Footer />
    </div>
  );
};

export default Media;
