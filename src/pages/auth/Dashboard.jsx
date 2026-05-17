import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../auth/AuthContext';
import '../../styles/Auth.css';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <Header />
      <div className="profile-wrap">
        <div className="container">
          <div className="profile-main" style={{ padding: '32px 36px' }}>
            <h2>Личный кабинет</h2>
            <p className="lede">Добро пожаловать, {user?.name?.split(' ')[0]}!</p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 16,
                marginTop: 20,
              }}
            >
              <Link
                to="/profile"
                className="auth-btn auth-btn-ghost"
                style={{ height: 'auto', padding: 16, flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>👤</div>
                <strong>Профиль</strong>
                <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.8 }}>
                  Личные данные
                </span>
              </Link>

              <Link
                to="/profile?tab=requests"
                className="auth-btn auth-btn-ghost"
                style={{ height: 'auto', padding: 16, flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>📋</div>
                <strong>Заявки</strong>
                <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.8 }}>
                  История обращений
                </span>
              </Link>

              <Link
                to="/profile?tab=favorites"
                className="auth-btn auth-btn-ghost"
                style={{ height: 'auto', padding: 16, flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>★</div>
                <strong>Избранное</strong>
                <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.8 }}>
                  Клиники и доктора
                </span>
              </Link>

              <Link
                to="/treatment"
                className="auth-btn auth-btn-ghost"
                style={{ height: 'auto', padding: 16, flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>🏥</div>
                <strong>Каталог</strong>
                <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.8 }}>
                  Найти клинику
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
