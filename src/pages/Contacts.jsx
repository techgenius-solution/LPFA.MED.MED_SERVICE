import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.css';

const Contacts = () => {
  return (
    <div className="contacts-page">
      <Header />
      <div className="container">
        <div className="contacts-container">
          <h1 className="contacts-title">Контакты</h1>
          <div className="contacts-layout">
            <div className="contacts-info">
              <h3>Свяжитесь с нами</h3>
              <div className="contacts-item">
                <span className="contacts-item-icon">📞</span>
                <div className="contacts-item-text">
                  <div>+7 (701) 081-6040</div>
                  <div>+7 (727) 081-6040</div>
                </div>
              </div>
              <div className="contacts-item">
                <span className="contacts-item-icon">✉️</span>
                <div className="contacts-item-text">
                  <a href="mailto:info@smartmedservice.com">info@smartmedservice.com</a>
                </div>
              </div>
              <div className="contacts-item">
                <span className="contacts-item-icon">📍</span>
                <div className="contacts-item-text">
                  <div>г. Алматы, Казахстан</div>
                </div>
              </div>
              <div style={{ marginTop: '24px' }}>
                <h3>Социальные сети</h3>
                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  {['💬', '▶', 'f', 'VK', '✈', '📷'].map((icon, i) => (
                    <a
                      key={i}
                      href="#"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: '#f5f5f5',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        textDecoration: 'none',
                        color: '#555',
                        transition: 'background 0.2s',
                      }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contacts-form">
              <h3>Написать нам</h3>
              <div className="contacts-form-inner">
                <input type="text" placeholder="Ваше имя" />
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Телефон" />
                <textarea placeholder="Ваше сообщение..."></textarea>
                <button className="contacts-submit-btn">Отправить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;
