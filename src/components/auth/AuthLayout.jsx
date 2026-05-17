import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, children, side }) => {
  return (
    <div className="auth-shell">
      <div className="auth-shell-inner">
        <aside className="auth-side" aria-hidden="true">
          <Link to="/" className="auth-side-logo">
            <span className="auth-side-logo-mark">
              <span /><span /><span /><span />
            </span>
            <span className="auth-side-logo-text">
              <strong>SMART</strong>
              MED SERVICE
            </span>
          </Link>
          <div className="auth-side-content">
            <h2>Здоровье без границ</h2>
            <p>
              Личный кабинет SmartMed Service — управляйте заявками, избранными
              клиниками и историей обращений в одном месте.
            </p>
            {side}
            <ul className="auth-side-features">
              <li><span className="dot" /> 34 клиники и 784 доктора</li>
              <li><span className="dot" /> Бронирование и заявки онлайн</li>
              <li><span className="dot" /> Персональные рекомендации</li>
            </ul>
          </div>
          <div className="auth-side-foot">© SmartMed Service</div>
        </aside>

        <main className="auth-main">
          <div className="auth-main-top">
            <Link to="/" className="auth-back">← На главную</Link>
          </div>
          <div className="auth-card">
            <header className="auth-card-head">
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </header>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
