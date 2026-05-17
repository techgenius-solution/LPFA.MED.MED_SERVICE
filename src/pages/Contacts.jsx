import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.css';

const SOCIALS = [
  {
    label: 'WhatsApp',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4ZM12 21.5c-1.7 0-3.3-.5-4.7-1.3l-3.3.9.9-3.2c-1-1.5-1.5-3.2-1.5-5C3.4 8.2 7.3 4.3 12 4.3s8.6 3.9 8.6 8.6S16.7 21.5 12 21.5Zm0-19C6.2 2.5 1.5 7.2 1.5 13c0 1.9.5 3.7 1.4 5.3L1 23l4.8-1.3c1.5.8 3.3 1.3 5.2 1.3 5.8 0 10.5-4.7 10.5-10.5S17.8 2 12 2Z"/>
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.9 3.1 2.3 10.7c-.9.3-.9.9-.2 1.1l5 1.6 1.9 5.9c.2.6.5.7 1 .3l2.8-2.4 4.9 3.6c.9.5 1.5.2 1.7-.8l3.1-14.5c.3-1.3-.4-1.8-1.5-1.4Zm-5.4 4.5-8.6 7.8-.3 3.4-1.7-5.3 10.6-5.9Z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23 7.5s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-1C16.7 4 12 4 12 4s-4.7 0-7.9.2c-.4.1-1.4.1-2.2 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.4C.8 14.6 1 16.5 1 16.5s.2 1.6.9 2.3c.8.9 2 .8 2.5.9 1.8.2 7.6.2 7.6.2s4.7 0 7.9-.2c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8ZM9.7 15.1V8.3l6.2 3.4-6.2 3.4Z"/>
      </svg>
    ),
  },
  {
    label: 'ВКонтакте',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.8 17.3c-5.9 0-9.3-4.1-9.5-10.8h3c.1 4.9 2.2 7 4 7.4V6.5h2.8v4.4c1.8-.2 3.6-2.2 4.2-4.4h2.8c-.5 2.8-2.5 4.8-3.9 5.6 1.4.7 3.7 2.4 4.5 5.5h-3.1c-.7-2.1-2.3-3.7-4.4-4v4h-.3l-.1-.3Z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.6 9.9V14.9H8V12h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.3h-1.2c-1.2 0-1.6.7-1.6 1.5V12h2.7l-.4 2.9h-2.3V22A10 10 0 0 0 22 12Z"/>
      </svg>
    ),
  },
];

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
                <span className="contacts-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/>
                  </svg>
                </span>
                <div className="contacts-item-text">
                  <a href="tel:+77010816040">+7 (701) 081-6040</a>
                  <a href="tel:+77270816040">+7 (727) 081-6040</a>
                </div>
              </div>

              <div className="contacts-item">
                <span className="contacts-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <div className="contacts-item-text">
                  <a href="mailto:info@smartmedservice.com">info@smartmedservice.com</a>
                </div>
              </div>

              <div className="contacts-item">
                <span className="contacts-item-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <div className="contacts-item-text">
                  <span>г. Алматы, Казахстан</span>
                </div>
              </div>

              <div className="contacts-socials">
                <h3>Социальные сети</h3>
                <div className="contacts-social-row">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="contacts-social-btn"
                      aria-label={s.label}
                      title={s.label}
                    >
                      {s.icon}
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
                <button className="contacts-submit-btn">
                  Отправить
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
                  </svg>
                </button>
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
