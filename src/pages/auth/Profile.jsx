import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FormInput from '../../components/auth/FormInput';
import { useAuth } from '../../auth/AuthContext';
import { useToast } from '../../auth/Toast';
import { validateName, validatePhone } from '../../auth/validation';
import '../../styles/Auth.css';

const initials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() || '')
    .join('') || '?';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') || 'profile';

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  const setTab = (t) => setParams({ tab: t });

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    const errs = {};
    const nE = validateName(form.name);
    if (nE) errs.name = nE;
    const pE = validatePhone(form.phone);
    if (pE) errs.phone = pE;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      await updateProfile({ name: form.name.trim(), phone: form.phone.trim() });
      toast.success('Изменения сохранены');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <Header />
      <div className="profile-wrap">
        <div className="container">
          <div className="profile-grid">
            <aside className="profile-side">
              <div className="profile-side-avatar">
                {user.avatar ? <img src={user.avatar} alt="" /> : <span>{initials(user.name)}</span>}
              </div>
              <div className="profile-side-name">{user.name}</div>
              <div className="profile-side-email">{user.email}</div>
              <nav className="profile-tabs">
                <button
                  className={`profile-tab ${tab === 'profile' ? 'active' : ''}`}
                  onClick={() => setTab('profile')}
                >
                  👤 Профиль
                </button>
                <button
                  className={`profile-tab ${tab === 'security' ? 'active' : ''}`}
                  onClick={() => setTab('security')}
                >
                  🔒 Безопасность
                </button>
                <button
                  className={`profile-tab ${tab === 'favorites' ? 'active' : ''}`}
                  onClick={() => setTab('favorites')}
                >
                  ★ Избранное
                </button>
                <button
                  className={`profile-tab ${tab === 'requests' ? 'active' : ''}`}
                  onClick={() => setTab('requests')}
                >
                  📋 Мои заявки
                </button>
                <button className="profile-tab logout" onClick={handleLogout}>
                  ⎋ Выйти
                </button>
              </nav>
            </aside>

            <section className="profile-main">
              {tab === 'profile' && (
                <>
                  <h2>
                    Профиль
                    {user.verified ? (
                      <span className="verify-badge ok">✓ подтверждён</span>
                    ) : (
                      <span className="verify-badge pending">! не подтверждён</span>
                    )}
                  </h2>
                  <p className="lede">
                    Эта информация будет использоваться в заявках в клиники.
                  </p>

                  {!user.verified && (
                    <div className="auth-banner info" style={{ marginBottom: 16 }}>
                      Email не подтверждён.{' '}
                      <Link to="/verify-email" className="auth-link">
                        Подтвердить →
                      </Link>
                    </div>
                  )}

                  <form className="auth-form" onSubmit={save} noValidate>
                    <FormInput
                      label="Имя"
                      value={form.name}
                      onChange={set('name')}
                      error={errors.name}
                    />
                    <FormInput
                      label="Email"
                      type="email"
                      value={user.email}
                      readOnly
                      hint="Email изменить нельзя"
                    />
                    <FormInput
                      label="Телефон"
                      type="tel"
                      placeholder="+7 999 123-45-67"
                      value={form.phone}
                      onChange={set('phone')}
                      error={errors.phone}
                    />

                    <button
                      type="submit"
                      className="auth-btn"
                      disabled={busy}
                      style={{ width: 'auto', padding: '0 28px', alignSelf: 'flex-start' }}
                    >
                      {busy && <span className="spinner" />}
                      {busy ? 'Сохраняем…' : 'Сохранить'}
                    </button>
                  </form>
                </>
              )}

              {tab === 'security' && (
                <>
                  <h2>Безопасность</h2>
                  <p className="lede">Управление паролем и сессиями</p>
                  <Link to="/forgot-password" className="auth-link" style={{ fontSize: 14 }}>
                    Сменить пароль через email →
                  </Link>
                </>
              )}

              {tab === 'favorites' && (
                <>
                  <h2>Избранное</h2>
                  <p className="lede">Здесь будут сохранённые клиники и доктора.</p>
                  <div className="auth-banner info">
                    Пока пусто. Добавьте клиники из{' '}
                    <Link to="/treatment" className="auth-link">
                      каталога
                    </Link>
                    .
                  </div>
                </>
              )}

              {tab === 'requests' && (
                <>
                  <h2>Мои заявки</h2>
                  <p className="lede">История ваших обращений в клиники.</p>
                  <div className="auth-banner info">
                    Заявок пока нет. Перейдите в{' '}
                    <Link to="/treatment" className="auth-link">
                      каталог клиник
                    </Link>{' '}
                    и оставьте первую.
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
